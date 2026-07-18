// Firebase Auth + Firestore Helpers
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let currentUserId = null;
let firebaseReady = false;
let firebaseError = null;

function isFirebaseConfigured() {
    return FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY_HERE';
}

async function initFirebase() {
    if (!isFirebaseConfigured()) {
        console.log('Firebase not configured. History feature disabled.');
        firebaseError = 'Not configured. Add keys to firebase-config.js';
        return false;
    }

    try {
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.firestore();

        const result = await firebaseAuth.signInAnonymously();
        currentUserId = result.user.uid;
        firebaseReady = true;
        console.log('Firebase connected. User:', currentUserId);
        return true;
    } catch (err) {
        console.error('Firebase init failed:', err.code, err.message);
        if (err.code === 'auth/operation-not-allowed') {
            firebaseError = 'Anonymous auth not enabled. Enable it in Firebase Console → Authentication → Sign-in method.';
        } else {
            firebaseError = err.code + ': ' + err.message;
        }
        return false;
    }
}

async function saveGameResult(score, difficulty) {
    if (!firebaseReady || !firebaseDb || !currentUserId) {
        console.warn('Save skipped: Firebase not ready.', { firebaseReady, hasDb: !!firebaseDb, userId: currentUserId });
        return;
    }

    let result;
    if (score.player > score.ai) result = 'win';
    else if (score.ai > score.player) result = 'loss';
    else result = 'draw';

    try {
        await firebaseDb.collection('users').doc(currentUserId).collection('games').add({
            score: { player: score.player, ai: score.ai },
            difficulty: difficulty,
            result: result,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            duration: CONFIG.gameDuration
        });
        console.log('Game result saved.');
    } catch (err) {
        console.error('Failed to save game result:', err.code, err.message);
        firebaseError = 'Save failed: ' + err.message;
    }
}

async function loadGameHistory(limitCount) {
    if (!firebaseDb || !currentUserId) return [];

    try {
        // Avoid orderBy to skip Firestore index requirement — sort in JS instead
        const snapshot = await firebaseDb
            .collection('users')
            .doc(currentUserId)
            .collection('games')
            .limit(limitCount || 50)
            .get();

        const games = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            games.push({
                id: doc.id,
                score: data.score,
                difficulty: data.difficulty,
                result: data.result,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
                duration: data.duration
            });
        });

        // Sort newest first in JS
        games.sort((a, b) => b.timestamp - a.timestamp);
        return games;
    } catch (err) {
        console.error('Failed to load history:', err.code, err.message);
        firebaseError = 'Load failed: ' + err.message;
        return [];
    }
}

async function clearGameHistory() {
    if (!firebaseDb || !currentUserId) return;

    try {
        const snapshot = await firebaseDb
            .collection('users')
            .doc(currentUserId)
            .collection('games')
            .get();

        const batch = firebaseDb.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log('History cleared.');
    } catch (err) {
        console.error('Failed to clear history:', err.code, err.message);
    }
}
