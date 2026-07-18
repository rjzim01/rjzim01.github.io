export const CONFIG = {
    fieldWidth: 800,
    fieldHeight: 500,
    playerRadius: 20,
    ballRadius: 12,
    goalWidth: 10,
    goalHeight: 120,
    playerSpeed: 5,
    ballFriction: 0.98,
    kickPower: 15,
    gameDuration: 60,
    aiDifficulty: {
        easy: { speed: 2.5, reactionDelay: 300, accuracy: 0.6 },
        medium: { speed: 3.5, reactionDelay: 150, accuracy: 0.8 },
        hard: { speed: 4.5, reactionDelay: 50, accuracy: 0.95 }
    }
};
