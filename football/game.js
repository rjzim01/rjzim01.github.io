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
    gameDuration: 60,
    aiDifficulty: {
        easy: { speed: 2.5, reactionDelay: 300, accuracy: 0.6 },
        medium: { speed: 3.5, reactionDelay: 150, accuracy: 0.8 },
        hard: { speed: 4.5, reactionDelay: 50, accuracy: 0.95 }
    }
};

// Game State
let gameState = {
    aiLevel: 'medium',
    running: false,
    paused: false,
    timeLeft: CONFIG.gameDuration,
    score: { player: 0, ai: 0 }
};

// Game Objects
let player, ai, ball;
let keys = {};
let aiLastUpdate = 0;
let aiTarget = { x: 0, y: 0 };

// Touch/Joystick state
let joystick = { active: false, dx: 0, dy: 0 };
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

    if (isMobile && gameState.running) {
        mobileControls.style.display = 'block';
    } else if (!gameState.running) {
        mobileControls.style.display = 'none';
    }
}

// DOM Elements
const menu = document.getElementById('menu');
const gameOver = document.getElementById('gameOver');
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
    player = {
        x: 100,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.playerRadius,
        color: '#4dabf7',
        vx: 0,
        vy: 0
    };

    ai = {
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

    // Left goal - Player's goal (blue)
    ctx.fillStyle = '#4dabf7';
    ctx.fillRect(0, goalY, CONFIG.goalWidth, CONFIG.goalHeight);

    // Right goal - AI's goal (red)
    ctx.fillStyle = '#ff6b6b';
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

function drawPlayer(p, isPlayer) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(p.x + 3, p.y + p.radius - 5, p.radius * 0.8, p.radius * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isPlayer ? 'YOU' : 'AI', p.x, p.y);
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
function moveEntity(entity, dx, dy) {
    entity.x += dx * CONFIG.playerSpeed;
    entity.y += dy * CONFIG.playerSpeed;

    entity.x = Math.max(entity.radius, Math.min(CONFIG.fieldWidth - entity.radius, entity.x));
    entity.y = Math.max(entity.radius, Math.min(CONFIG.fieldHeight - entity.radius, entity.y));
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

    // Left goal (Player's goal) - AI scores here
    if (ball.x - ball.radius < 0) {
        if (inGoalY) {
            scoreGoal('ai');
        } else {
            ball.vx *= -0.8;
            ball.x = ball.radius;
        }
    }

    // Right goal (AI's goal) - Player scores here
    if (ball.x + ball.radius > CONFIG.fieldWidth) {
        if (inGoalY) {
            scoreGoal('player');
        } else {
            ball.vx *= -0.8;
            ball.x = CONFIG.fieldWidth - ball.radius;
        }
    }
}

function checkCollision(entity) {
    const dx = ball.x - entity.x;
    const dy = ball.y - entity.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = entity.radius + ball.radius;

    if (dist < minDist) {
        const nx = dx / dist;
        const ny = dy / dist;

        ball.x = entity.x + nx * minDist;
        ball.y = entity.y + ny * minDist;

        const relVel = (entity.vx || 0) - ball.vx;
        ball.vx += nx * 3 + relVel * 0.3;
        ball.vy += ny * 3;

        return true;
    }
    return false;
}

function kickBall(entity, power) {
    const dx = ball.x - entity.x;
    const dy = ball.y - entity.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < entity.radius + ball.radius + 15) {
        const nx = dx / dist;
        const ny = dy / dist;
        ball.vx = nx * power;
        ball.vy = ny * power;
    }
}

// AI Logic
function updateAI() {
    const now = Date.now();
    const aiConfig = CONFIG.aiDifficulty[gameState.aiLevel];

    if (now - aiLastUpdate < aiConfig.reactionDelay) return;
    aiLastUpdate = now;

    const ballMovingTowardsAI = ball.vx > 0;
    const distToBall = Math.sqrt((ball.x - ai.x) ** 2 + (ball.y - ai.y) ** 2);

    if (ballMovingTowardsAI || ball.x > CONFIG.fieldWidth * 0.5) {
        aiTarget.x = ball.x - 30;
        aiTarget.y = ball.y;

        if (Math.random() > aiConfig.accuracy) {
            aiTarget.y += (Math.random() - 0.5) * 100;
        }
    } else {
        aiTarget.x = ball.x + 50;
        aiTarget.y = ball.y;
    }

    aiTarget.x = Math.max(CONFIG.fieldWidth * 0.4, aiTarget.x);

    const dx = aiTarget.x - ai.x;
    const dy = aiTarget.y - ai.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
        const moveX = (dx / dist) * aiConfig.speed;
        const moveY = (dy / dist) * aiConfig.speed;
        moveEntity(ai, moveX / CONFIG.playerSpeed, moveY / CONFIG.playerSpeed);
    }

    if (distToBall < ai.radius + ball.radius + 15) {
        kickBall(ai, CONFIG.kickPower * (0.8 + Math.random() * 0.4));
    }
}

// Game Flow
function scoreGoal(scorer) {
    if (scorer === 'player') {
        gameState.score.player++;
        score1Display.textContent = gameState.score.player;
    } else {
        gameState.score.ai++;
        score2Display.textContent = gameState.score.ai;
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
    player.x = 100;
    player.y = CONFIG.fieldHeight / 2;
    ai.x = CONFIG.fieldWidth - 100;
    ai.y = CONFIG.fieldHeight / 2;
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
    if (gameState.score.player > gameState.score.ai) {
        winner = 'You Win!';
    } else if (gameState.score.ai > gameState.score.player) {
        winner = 'AI Wins!';
    } else {
        winner = "It's a Draw!";
    }

    winnerText.textContent = winner;
    finalScore.textContent = `Final Score: ${gameState.score.player} - ${gameState.score.ai}`;
    gameOver.style.display = 'block';
}

function startGame() {
    menu.style.display = 'none';
    gameOver.style.display = 'none';

    gameState.running = true;
    gameState.timeLeft = CONFIG.gameDuration;
    gameState.score = { player: 0, ai: 0 };

    score1Display.textContent = '0';
    score2Display.textContent = '0';
    timerDisplay.textContent = '01:00';

    initGameObjects();
    checkMobile();
}

// Keyboard Input
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (e.code === 'Space' && gameState.running) {
        e.preventDefault();
        kickBall(player, CONFIG.kickPower);
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Joystick Touch Controls
function setupJoystick() {
    const base = document.querySelector('#joystick1 .joystick-base');
    const stick = document.getElementById('stick1');

    if (!base || !stick) return;

    const maxDistance = 35;

    function handleStart(e) {
        e.preventDefault();
        joystick.active = true;
    }

    function handleMove(e) {
        if (!joystick.active) return;
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

        joystick.dx = dx / maxDistance;
        joystick.dy = dy / maxDistance;
    }

    function handleEnd(e) {
        e.preventDefault();
        joystick.active = false;
        joystick.dx = 0;
        joystick.dy = 0;
        stick.style.transform = 'translate(0, 0)';
    }

    base.addEventListener('touchstart', handleStart, { passive: false });
    base.addEventListener('touchmove', handleMove, { passive: false });
    base.addEventListener('touchend', handleEnd, { passive: false });
    base.addEventListener('touchcancel', handleEnd, { passive: false });

    base.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', (e) => {
        if (joystick.active) handleMove(e);
    });
    document.addEventListener('mouseup', handleEnd);
}

// Setup kick button
function setupKickButton() {
    const kickBtn = document.getElementById('kickBtn1');

    if (kickBtn) {
        kickBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (gameState.running) kickBall(player, CONFIG.kickPower);
        }, { passive: false });

        kickBtn.addEventListener('click', () => {
            if (gameState.running) kickBall(player, CONFIG.kickPower);
        });
    }
}

// Handle player movement
function handleInput() {
    let dx = 0, dy = 0;

    // Keyboard
    if (keys['KeyW'] || keys['ArrowUp']) dy = -1;
    if (keys['KeyS'] || keys['ArrowDown']) dy = 1;
    if (keys['KeyA'] || keys['ArrowLeft']) dx = -1;
    if (keys['KeyD'] || keys['ArrowRight']) dx = 1;

    // Joystick
    if (joystick.dx !== 0 || joystick.dy !== 0) {
        dx = joystick.dx;
        dy = joystick.dy;
    }

    if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        moveEntity(player, dx / len, dy / len);
    }
}

// Menu Event Listeners
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
        checkCollision(player);
        checkCollision(ai);
    }

    drawPlayer(player, true);
    drawPlayer(ai, false);
    drawBall();

    requestAnimationFrame(gameLoop);
}

// Initialize
function init() {
    resizeCanvas();
    initGameObjects();
    setupJoystick();
    setupKickButton();
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
