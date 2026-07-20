// Firebase Auth + Realtime Database Helpers
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let currentUserId = null;
let firebaseReady = false;
let firebaseError = null;

function isFirebaseConfigured() {
    return FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey !== 'YOUR_FOOTBALL_API_KEY';
}

async function initFirebase() {
    if (!isFirebaseConfigured()) {
        firebaseError = 'Not configured. Add keys to firebase-config.js';
        return false;
    }

    try {
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.database();

        const result = await firebaseAuth.signInAnonymously();
        currentUserId = result.user.uid;
        firebaseReady = true;
        return true;
    } catch (err) {
        if (err.code === 'auth/operation-not-allowed') {
            firebaseError = 'Anonymous auth not enabled. Enable it in Firebase Console → Authentication → Sign-in method.';
        } else {
            firebaseError = err.code + ': ' + err.message;
        }
        return false;
    }
}

async function saveGameResult(score, difficulty) {
    if (!firebaseReady || !firebaseDb || !currentUserId) return;

    let result;
    if (score.player > score.ai) result = 'win';
    else if (score.ai > score.player) result = 'loss';
    else result = 'draw';

    const gameData = {
        score: { player: score.player, ai: score.ai },
        difficulty: difficulty,
        result: result,
        timestamp: Date.now(),
        duration: CONFIG.gameDuration
    };

    try {
        await firebaseDb.ref('users/' + currentUserId + '/games').push(gameData);
    } catch (err) {
        firebaseError = 'Save failed: ' + err.message;
    }
}

async function loadGameHistory(limitCount) {
    if (!firebaseDb || !currentUserId) return [];

    try {
        const snapshot = await firebaseDb
            .ref('users/' + currentUserId + '/games')
            .orderByChild('timestamp')
            .limitToLast(limitCount || 50)
            .once('value');

        const games = [];
        snapshot.forEach(child => {
            const data = child.val();
            games.push({
                id: child.key,
                score: data.score,
                difficulty: data.difficulty,
                result: data.result,
                timestamp: new Date(data.timestamp),
                duration: data.duration
            });
        });

        games.reverse();
        return games;
    } catch (err) {
        firebaseError = 'Load failed: ' + err.message;
        return [];
    }
}

async function clearGameHistory() {
    if (!firebaseDb || !currentUserId) return;

    try {
        await firebaseDb.ref('users/' + currentUserId + '/games').remove();
    } catch (err) {
        firebaseError = 'Clear failed: ' + err.message;
    }
}
