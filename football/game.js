// Game Configuration
const CONFIG = {
    fieldWidth: 800,
    fieldHeight: 500,
    playerRadius: 20,
    ballRadius: 12,
    goalWidth: 10,
    goalHeight: 120,
    playerSpeed: 5,
    ballFriction: 0.98,
    kickPower: 15,
    gameDuration: 120,
    aiDifficulty: {
        easy: { speed: 2.5, reactionDelay: 300, accuracy: 0.6 },
        medium: { speed: 3.5, reactionDelay: 150, accuracy: 0.8 },
        hard: { speed: 4.5, reactionDelay: 50, accuracy: 0.95 }
    }
};

// Game State
let gameState = {
    mode: 'pvp',
    aiLevel: 'easy',
    running: false,
    paused: false,
    timeLeft: CONFIG.gameDuration,
    score: { player1: 0, player2: 0 }
};

// Game Objects
let player1, player2, ball;
let keys = {};
let aiLastUpdate = 0;
let aiTarget = { x: 0, y: 0 };

// Touch/Joystick state
let joystick1 = { active: false, dx: 0, dy: 0 };
let joystick2 = { active: false, dx: 0, dy: 0 };
let isMobile = false;

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas sizing
function resizeCanvas() {
    const maxWidth = Math.min(window.innerWidth - 20, 800);
    const maxHeight = window.innerHeight - 250;

    const aspectRatio = CONFIG.fieldWidth / CONFIG.fieldHeight;
    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
    }

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = CONFIG.fieldWidth;
    canvas.height = CONFIG.fieldHeight;
}

// Check if mobile
function checkMobile() {
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    const mobileControls = document.getElementById('mobileControls');
    const joystick2Container = document.getElementById('joystick2');

    if (isMobile && gameState.running) {
        mobileControls.style.display = 'block';
        joystick2Container.style.display = gameState.mode === 'pvp' ? 'flex' : 'none';
    } else if (!gameState.running) {
        mobileControls.style.display = 'none';
    }
}

// DOM Elements
const menu = document.getElementById('menu');
const gameOver = document.getElementById('gameOver');
const pvpBtn = document.getElementById('pvpBtn');
const pvcBtn = document.getElementById('pvcBtn');
const difficultyDiv = document.getElementById('difficulty');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');
const timerDisplay = document.getElementById('timer');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const winnerText = document.getElementById('winnerText');
const finalScore = document.getElementById('finalScore');
const mobileControls = document.getElementById('mobileControls');

// Initialize Game Objects
function initGameObjects() {
    player1 = {
        x: 100,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.playerRadius,
        color: '#4dabf7',
        vx: 0,
        vy: 0
    };

    player2 = {
        x: CONFIG.fieldWidth - 100,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.playerRadius,
        color: '#ff6b6b',
        vx: 0,
        vy: 0
    };

    ball = {
        x: CONFIG.fieldWidth / 2,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.ballRadius,
        vx: 0,
        vy: 0
    };
}

// Draw Functions
function drawField() {
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(0, 0, CONFIG.fieldWidth, CONFIG.fieldHeight);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(CONFIG.fieldWidth / 2, 0);
    ctx.lineTo(CONFIG.fieldWidth / 2, CONFIG.fieldHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(CONFIG.fieldWidth / 2, CONFIG.fieldHeight / 2, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(CONFIG.fieldWidth / 2, CONFIG.fieldHeight / 2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeRect(0, (CONFIG.fieldHeight - 200) / 2, 80, 200);
    ctx.strokeRect(CONFIG.fieldWidth - 80, (CONFIG.fieldHeight - 200) / 2, 80, 200);

    ctx.strokeRect(0, (CONFIG.fieldHeight - 100) / 2, 30, 100);
    ctx.strokeRect(CONFIG.fieldWidth - 30, (CONFIG.fieldHeight - 100) / 2, 30, 100);

    const goalY = (CONFIG.fieldHeight - CONFIG.goalHeight) / 2;

    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(0, goalY, CONFIG.goalWidth, CONFIG.goalHeight);

    ctx.fillStyle = '#4dabf7';
    ctx.fillRect(CONFIG.fieldWidth - CONFIG.goalWidth, goalY, CONFIG.goalWidth, CONFIG.goalHeight);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < CONFIG.goalHeight; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, goalY + i);
        ctx.lineTo(CONFIG.goalWidth, goalY + i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(CONFIG.fieldWidth - CONFIG.goalWidth, goalY + i);
        ctx.lineTo(CONFIG.fieldWidth, goalY + i);
        ctx.stroke();
    }
}

function drawPlayer(player, isPlayer1) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(player.x + 3, player.y + player.radius - 5, player.radius * 0.8, player.radius * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isPlayer1 ? '1' : '2', player.x, player.y);
}

function drawBall() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(ball.x + 2, ball.y + ball.radius, ball.radius * 0.8, ball.radius * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#333';
    const angle = Date.now() / 200;
    for (let i = 0; i < 5; i++) {
        const a = angle + (i * Math.PI * 2 / 5);
        const px = ball.x + Math.cos(a) * ball.radius * 0.5;
        const py = ball.y + Math.sin(a) * ball.radius * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Physics Functions
function movePlayer(player, dx, dy) {
    player.x += dx * CONFIG.playerSpeed;
    player.y += dy * CONFIG.playerSpeed;

    player.x = Math.max(player.radius, Math.min(CONFIG.fieldWidth - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(CONFIG.fieldHeight - player.radius, player.y));
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= CONFIG.ballFriction;
    ball.vy *= CONFIG.ballFriction;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > CONFIG.fieldHeight) {
        ball.vy *= -0.8;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : CONFIG.fieldHeight - ball.radius;
    }

    const goalY = (CONFIG.fieldHeight - CONFIG.goalHeight) / 2;
    const inGoalY = ball.y > goalY && ball.y < goalY + CONFIG.goalHeight;

    if (ball.x - ball.radius < 0) {
        if (inGoalY) {
            scoreGoal(1);
        } else {
            ball.vx *= -0.8;
            ball.x = ball.radius;
        }
    }

    if (ball.x + ball.radius > CONFIG.fieldWidth) {
        if (inGoalY) {
            scoreGoal(2);
        } else {
            ball.vx *= -0.8;
            ball.x = CONFIG.fieldWidth - ball.radius;
        }
    }
}

function checkCollision(player) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = player.radius + ball.radius;

    if (dist < minDist) {
        const nx = dx / dist;
        const ny = dy / dist;

        ball.x = player.x + nx * minDist;
        ball.y = player.y + ny * minDist;

        const relVel = (player.vx || 0) - ball.vx;
        ball.vx += nx * 3 + relVel * 0.3;
        ball.vy += ny * 3;

        return true;
    }
    return false;
}

function kickBall(player, power) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < player.radius + ball.radius + 15) {
        const nx = dx / dist;
        const ny = dy / dist;
        ball.vx = nx * power;
        ball.vy = ny * power;
    }
}

// AI Logic
function updateAI() {
    if (gameState.mode !== 'pvc') return;

    const now = Date.now();
    const ai = CONFIG.aiDifficulty[gameState.aiLevel];

    if (now - aiLastUpdate < ai.reactionDelay) return;
    aiLastUpdate = now;

    const ballMovingTowardsAI = ball.vx > 0;
    const distToBall = Math.sqrt((ball.x - player2.x) ** 2 + (ball.y - player2.y) ** 2);

    if (ballMovingTowardsAI || ball.x > CONFIG.fieldWidth * 0.5) {
        aiTarget.x = ball.x - 30;
        aiTarget.y = ball.y;

        if (Math.random() > ai.accuracy) {
            aiTarget.y += (Math.random() - 0.5) * 100;
        }
    } else {
        aiTarget.x = ball.x + 50;
        aiTarget.y = ball.y;
    }

    aiTarget.x = Math.max(CONFIG.fieldWidth * 0.4, aiTarget.x);

    const dx = aiTarget.x - player2.x;
    const dy = aiTarget.y - player2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
        const moveX = (dx / dist) * ai.speed;
        const moveY = (dy / dist) * ai.speed;
        movePlayer(player2, moveX / CONFIG.playerSpeed, moveY / CONFIG.playerSpeed);
    }

    if (distToBall < player2.radius + ball.radius + 15) {
        kickBall(player2, CONFIG.kickPower * (0.8 + Math.random() * 0.4));
    }
}

// Game Flow
function scoreGoal(scorer) {
    if (scorer === 1) {
        gameState.score.player1++;
        score1Display.textContent = gameState.score.player1;
    } else {
        gameState.score.player2++;
        score2Display.textContent = gameState.score.player2;
    }

    showGoalAnimation();
    resetPositions();
}

function showGoalAnimation() {
    const goalDiv = document.createElement('div');
    goalDiv.className = 'goal-animation';
    goalDiv.textContent = 'GOAL!';
    document.querySelector('.game-container').appendChild(goalDiv);

    setTimeout(() => goalDiv.remove(), 1500);
}

function resetPositions() {
    player1.x = 100;
    player1.y = CONFIG.fieldHeight / 2;
    player2.x = CONFIG.fieldWidth - 100;
    player2.y = CONFIG.fieldHeight / 2;
    ball.x = CONFIG.fieldWidth / 2;
    ball.y = CONFIG.fieldHeight / 2;
    ball.vx = 0;
    ball.vy = 0;
}

function updateTimer() {
    if (!gameState.running || gameState.paused) return;

    gameState.timeLeft--;
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (gameState.timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    gameState.running = false;
    mobileControls.style.display = 'none';

    let winner;
    if (gameState.score.player1 > gameState.score.player2) {
        winner = 'Player 1 Wins!';
    } else if (gameState.score.player2 > gameState.score.player1) {
        winner = gameState.mode === 'pvc' ? 'AI Wins!' : 'Player 2 Wins!';
    } else {
        winner = "It's a Draw!";
    }

    winnerText.textContent = winner;
    finalScore.textContent = `Final Score: ${gameState.score.player1} - ${gameState.score.player2}`;
    gameOver.style.display = 'block';
}

function startGame() {
    menu.style.display = 'none';
    gameOver.style.display = 'none';

    gameState.running = true;
    gameState.timeLeft = CONFIG.gameDuration;
    gameState.score = { player1: 0, player2: 0 };

    score1Display.textContent = '0';
    score2Display.textContent = '0';
    timerDisplay.textContent = '02:00';

    initGameObjects();
    checkMobile();
}

// Keyboard Input
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (e.code === 'Space' && gameState.running) {
        e.preventDefault();
        kickBall(player1, CONFIG.kickPower);
    }
    if (e.code === 'Enter' && gameState.running && gameState.mode === 'pvp') {
        e.preventDefault();
        kickBall(player2, CONFIG.kickPower);
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Joystick Touch Controls
function setupJoystick(joystickId, stickId, joystickState) {
    const base = document.querySelector(`#${joystickId} .joystick-base`);
    const stick = document.getElementById(stickId);

    if (!base || !stick) return;

    const maxDistance = 35;

    function handleStart(e) {
        e.preventDefault();
        joystickState.active = true;
    }

    function handleMove(e) {
        if (!joystickState.active) return;
        e.preventDefault();

        const rect = base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxDistance) {
            dx = (dx / distance) * maxDistance;
            dy = (dy / distance) * maxDistance;
        }

        stick.style.transform = `translate(${dx}px, ${dy}px)`;

        joystickState.dx = dx / maxDistance;
        joystickState.dy = dy / maxDistance;
    }

    function handleEnd(e) {
        e.preventDefault();
        joystickState.active = false;
        joystickState.dx = 0;
        joystickState.dy = 0;
        stick.style.transform = 'translate(0, 0)';
    }

    base.addEventListener('touchstart', handleStart, { passive: false });
    base.addEventListener('touchmove', handleMove, { passive: false });
    base.addEventListener('touchend', handleEnd, { passive: false });
    base.addEventListener('touchcancel', handleEnd, { passive: false });

    // Mouse support for testing
    base.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', (e) => {
        if (joystickState.active) handleMove(e);
    });
    document.addEventListener('mouseup', handleEnd);
}

// Setup kick buttons
function setupKickButtons() {
    const kickBtn1 = document.getElementById('kickBtn1');
    const kickBtn2 = document.getElementById('kickBtn2');

    if (kickBtn1) {
        kickBtn1.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (gameState.running) kickBall(player1, CONFIG.kickPower);
        }, { passive: false });

        kickBtn1.addEventListener('click', () => {
            if (gameState.running) kickBall(player1, CONFIG.kickPower);
        });
    }

    if (kickBtn2) {
        kickBtn2.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (gameState.running && gameState.mode === 'pvp') {
                kickBall(player2, CONFIG.kickPower);
            }
        }, { passive: false });

        kickBtn2.addEventListener('click', () => {
            if (gameState.running && gameState.mode === 'pvp') {
                kickBall(player2, CONFIG.kickPower);
            }
        });
    }
}

// Handle player movement
function handleInput() {
    // Player 1 - Keyboard
    let p1dx = 0, p1dy = 0;
    if (keys['KeyW']) p1dy = -1;
    if (keys['KeyS']) p1dy = 1;
    if (keys['KeyA']) p1dx = -1;
    if (keys['KeyD']) p1dx = 1;

    // Player 1 - Joystick
    if (joystick1.dx !== 0 || joystick1.dy !== 0) {
        p1dx = joystick1.dx;
        p1dy = joystick1.dy;
    }

    if (p1dx !== 0 || p1dy !== 0) {
        const len = Math.sqrt(p1dx * p1dx + p1dy * p1dy);
        movePlayer(player1, p1dx / len, p1dy / len);
    }

    // Player 2 - only in PvP mode
    if (gameState.mode === 'pvp') {
        let p2dx = 0, p2dy = 0;

        // Keyboard
        if (keys['ArrowUp']) p2dy = -1;
        if (keys['ArrowDown']) p2dy = 1;
        if (keys['ArrowLeft']) p2dx = -1;
        if (keys['ArrowRight']) p2dx = 1;

        // Joystick
        if (joystick2.dx !== 0 || joystick2.dy !== 0) {
            p2dx = joystick2.dx;
            p2dy = joystick2.dy;
        }

        if (p2dx !== 0 || p2dy !== 0) {
            const len = Math.sqrt(p2dx * p2dx + p2dy * p2dy);
            movePlayer(player2, p2dx / len, p2dy / len);
        }
    }
}

// Menu Event Listeners
pvpBtn.addEventListener('click', () => {
    gameState.mode = 'pvp';
    pvpBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
    pvcBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    difficultyDiv.style.display = 'none';
});

pvcBtn.addEventListener('click', () => {
    gameState.mode = 'pvc';
    pvcBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
    pvpBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    difficultyDiv.style.display = 'block';
});

document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.aiLevel = btn.dataset.level;
    });
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', () => {
    gameOver.style.display = 'none';
    menu.style.display = 'block';
    mobileControls.style.display = 'none';
});

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, CONFIG.fieldWidth, CONFIG.fieldHeight);
    drawField();

    if (gameState.running) {
        handleInput();
        updateAI();
        updateBall();
        checkCollision(player1);
        checkCollision(player2);
    }

    drawPlayer(player1, true);
    drawPlayer(player2, false);
    drawBall();

    requestAnimationFrame(gameLoop);
}

// Initialize
function init() {
    resizeCanvas();
    initGameObjects();
    setupJoystick('joystick1', 'stick1', joystick1);
    setupJoystick('joystick2', 'stick2', joystick2);
    setupKickButtons();
    checkMobile();
    gameLoop();
}

// Event listeners
window.addEventListener('resize', () => {
    resizeCanvas();
    checkMobile();
});

setInterval(updateTimer, 1000);

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
    if (gameState.running) {
        e.preventDefault();
    }
}, { passive: false });

// Start
init();
