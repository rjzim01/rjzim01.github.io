// Firebase Auth + Firestore Helpers
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let currentUserId = null;

function isFirebaseConfigured() {
    return FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY_HERE';
}

async function initFirebase() {
    if (!isFirebaseConfigured()) {
        console.log('Firebase not configured. History feature disabled.');
        return false;
    }

    try {
        // Initialize Firebase using the compat SDK (loaded via CDN)
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.firestore();

        // Sign in anonymously
        const result = await firebaseAuth.signInAnonymously();
        currentUserId = result.user.uid;
        console.log('Firebase connected. User:', currentUserId);
        return true;
    } catch (err) {
        console.error('Firebase init failed:', err.message);
        return false;
    }
}

async function saveGameResult(score, difficulty) {
    if (!firebaseDb || !currentUserId) return;

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
        console.error('Failed to save game result:', err.message);
    }
}

async function loadGameHistory(limitCount) {
    if (!firebaseDb || !currentUserId) return [];

    try {
        const snapshot = await firebaseDb
            .collection('users')
            .doc(currentUserId)
            .collection('games')
            .orderBy('timestamp', 'desc')
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
        return games;
    } catch (err) {
        console.error('Failed to load history:', err.message);
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
        console.error('Failed to clear history:', err.message);
    }
}
