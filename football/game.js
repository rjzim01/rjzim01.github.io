// Sound Engine (Web Audio API - no external files)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new AudioCtx();
    return audioCtx;
}

function playTone(freq, duration, type, volume, ramp) {
    if (soundMuted) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        if (ramp) osc.frequency.linearRampToValueAtTime(ramp, ctx.currentTime + duration);
        gain.gain.setValueAtTime(volume || 0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function playNoise(duration, volume) {
    if (soundMuted) return;
    try {
        const ctx = getAudioCtx();
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume || 0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(ctx.currentTime);
    } catch (e) {}
}

const SFX = {
    kick() {
        playNoise(0.12, 0.4);
        playTone(200, 0.1, 'sine', 0.3, 80);
    },
    goal(scoredBy) {
        if (scoredBy === 'player') {
            // Happy rising celebration
            playTone(523, 0.15, 'sine', 0.3);
            setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 120);
            setTimeout(() => playTone(784, 0.25, 'sine', 0.35), 240);
            setTimeout(() => playTone(1047, 0.4, 'sine', 0.3), 400);
        } else {
            // Sad descending tone
            playTone(600, 0.2, 'sine', 0.3, 300);
            setTimeout(() => playTone(300, 0.4, 'sawtooth', 0.15), 200);
        }
    },
    whistle() {
        // Referee whistle
        playTone(1800, 0.15, 'sine', 0.25);
        setTimeout(() => playTone(2200, 0.35, 'sine', 0.3), 150);
    },
    whistleLong() {
        // End game whistle - 3 short blasts
        playTone(1800, 0.15, 'sine', 0.25);
        setTimeout(() => playTone(2200, 0.15, 'sine', 0.3), 200);
        setTimeout(() => playTone(1800, 0.15, 'sine', 0.25), 400);
        setTimeout(() => playTone(2200, 0.15, 'sine', 0.3), 600);
        setTimeout(() => playTone(2400, 0.4, 'sine', 0.35), 800);
    },
    pause() {
        playTone(440, 0.1, 'sine', 0.2, 330);
    },
    unpause() {
        playTone(330, 0.1, 'sine', 0.2, 440);
    },
    tick() {
        playTone(800, 0.05, 'sine', 0.1);
    },
    countdown() {
        playTone(600, 0.15, 'sine', 0.25);
    }
};

// Background ambient sound
let ambientNode = null;
let ambientGain = null;

function startAmbient() {
    try {
        const ctx = getAudioCtx();
        if (ambientNode) return;

        // Create looping crowd noise
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // Filtered noise to sound like distant crowd murmur
        let lastVal = 0;
        for (let i = 0; i < bufferSize; i++) {
            const noise = Math.random() * 2 - 1;
            lastVal = lastVal * 0.97 + noise * 0.03;
            data[i] = lastVal * 3;
        }

        ambientNode = ctx.createBufferSource();
        ambientNode.buffer = buffer;
        ambientNode.loop = true;

        // Low-pass filter for muffled crowd sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 1;

        ambientGain = ctx.createGain();
        ambientGain.gain.value = 0.08;

        ambientNode.connect(filter);
        filter.connect(ambientGain);
        ambientGain.connect(ctx.destination);
        ambientNode.start();
    } catch (e) {}
}

function stopAmbient() {
    try {
        if (ambientNode) {
            ambientNode.stop();
            ambientNode.disconnect();
            ambientNode = null;
        }
        if (ambientGain) {
            ambientGain.disconnect();
            ambientGain = null;
        }
    } catch (e) {}
}
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

// Touch/DPad state
let dpad = { up: false, down: false, left: false, right: false };
let isMobile = false;
let mobileSpeedMultiplier = 1;
let isPaused = false;
let swipeStart = null;
let soundMuted = false;

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas sizing
function resizeCanvas() {
    const isFullscreen = !!document.fullscreenElement || !!document.webkitFullscreenElement;

    if (isFullscreen && isMobile) {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.margin = '0';
        canvas.style.display = 'block';
    } else {
        const headerHeight = 250;
        const maxWidth = Math.min(window.innerWidth - 20, 800);
        const maxHeight = window.innerHeight - headerHeight;

        const aspectRatio = CONFIG.fieldWidth / CONFIG.fieldHeight;
        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.style.margin = '';
        canvas.style.display = '';
    }

    canvas.width = CONFIG.fieldWidth;
    canvas.height = CONFIG.fieldHeight;

    if (isMobile) {
        const screenScale = window.innerWidth / 800;
        mobileSpeedMultiplier = Math.max(0.8, Math.min(1.2, screenScale));
    } else {
        mobileSpeedMultiplier = 1;
    }
}

// Check if mobile
function checkMobile() {
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    const mobileControls = document.getElementById('mobileControls');
    const pauseBtn = document.getElementById('pauseBtn');

    if (isMobile && gameState.running) {
        mobileControls.style.display = 'block';
        if (pauseBtn) pauseBtn.style.display = 'block';
    } else if (!gameState.running) {
        mobileControls.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'none';
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
    const w = parseFloat(canvas.style.width) || CONFIG.fieldWidth;
    const h = parseFloat(canvas.style.height) || CONFIG.fieldHeight;
    const sx = w / CONFIG.fieldWidth;
    const sy = h / CONFIG.fieldHeight;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(p.x + 3, p.y + p.radius - 5, p.radius * 0.8 / sx, p.radius * 0.3 / sy, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.radius / sx, p.radius / sy, 0, 0, Math.PI * 2);
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
    const w = parseFloat(canvas.style.width) || CONFIG.fieldWidth;
    const h = parseFloat(canvas.style.height) || CONFIG.fieldHeight;
    const sx = w / CONFIG.fieldWidth;
    const sy = h / CONFIG.fieldHeight;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(ball.x + 2, ball.y + ball.radius, ball.radius * 0.8 / sx, ball.radius * 0.3 / sy, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.radius / sx, ball.radius / sy, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#333';
    const angle = Date.now() / 200;
    for (let i = 0; i < 5; i++) {
        const a = angle + (i * Math.PI * 2 / 5);
        const px = ball.x + Math.cos(a) * ball.radius * 0.5 / sx;
        const py = ball.y + Math.sin(a) * ball.radius * 0.5 / sy;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Physics Functions
function moveEntity(entity, dx, dy) {
    const speed = entity === player ? CONFIG.playerSpeed * mobileSpeedMultiplier : CONFIG.playerSpeed;
    entity.x += dx * speed;
    entity.y += dy * speed;

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
        SFX.kick();
    }
}

// AI Logic
function updateAI() {
    const now = Date.now();
    const aiConfig = CONFIG.aiDifficulty[gameState.aiLevel];

    if (now - aiLastUpdate < aiConfig.reactionDelay) return;
    aiLastUpdate = now;

    const mobilePenalty = isMobile ? 0.85 : 1;
    const effectiveSpeed = aiConfig.speed * mobilePenalty;

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
        const moveX = (dx / dist) * effectiveSpeed;
        const moveY = (dy / dist) * effectiveSpeed;
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

    SFX.goal(scorer);
    showGoalAnimation(scorer);
    resetPositions();
}

function showGoalAnimation(scorer) {
    const goalDiv = document.createElement('div');
    goalDiv.className = 'goal-animation';
    if (scorer === 'player') {
        goalDiv.textContent = 'GOAL!';
        goalDiv.classList.add('goal-good');
    } else {
        goalDiv.textContent = 'CONCEDED!';
        goalDiv.classList.add('goal-bad');
    }
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

    if (gameState.timeLeft <= 5 && gameState.timeLeft > 0) {
        SFX.countdown();
    }

    if (gameState.timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    gameState.running = false;
    mobileControls.style.display = 'none';
    stopAmbient();
    SFX.whistleLong();

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

    isPaused = false;
    gameState.paused = false;

    const overlay = document.querySelector('.pause-overlay');
    if (overlay) overlay.style.display = 'none';

    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) pauseBtn.textContent = '| |';

    gameState.running = true;
    gameState.timeLeft = CONFIG.gameDuration;
    gameState.score = { player: 0, ai: 0 };

    score1Display.textContent = '0';
    score2Display.textContent = '0';
    timerDisplay.textContent = '01:00';

    initGameObjects();
    checkMobile();
    startAmbient();
    SFX.whistle();
}

// Keyboard Input
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (e.code === 'Space' && gameState.running && !gameState.paused) {
        e.preventDefault();
        kickBall(player, CONFIG.kickPower);
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// D-Pad Controls
function setupDpad() {
    const dpadEl = document.getElementById('dpad');
    if (!dpadEl) return;

    // Prevent context menu on D-pad
    dpadEl.addEventListener('contextmenu', (e) => e.preventDefault());

    const dirs = [
        { id: 'btnUp', key: 'up' },
        { id: 'btnDown', key: 'down' },
        { id: 'btnLeft', key: 'left' },
        { id: 'btnRight', key: 'right' }
    ];

    // Drag state
    let dragging = false;
    let dragStartX = 0, dragStartY = 0;
    let dpadStartX = 0, dpadStartY = 0;
    let moved = false;
    const DRAG_THRESHOLD = 10;

    function startDrag(x, y) {
        const rect = dpadEl.getBoundingClientRect();
        dragging = true;
        moved = false;
        dragStartX = x;
        dragStartY = y;
        dpadStartX = rect.left;
        dpadStartY = rect.top;
        dpadEl.classList.add('dragging');
    }

    function moveDrag(x, y) {
        if (!dragging) return;
        const dx = x - dragStartX;
        const dy = y - dragStartY;
        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            moved = true;
        }
        if (moved) {
            const dpadW = dpadEl.offsetWidth;
            const dpadH = dpadEl.offsetHeight;
            let newLeft = dpadStartX + dx;
            let newTop = dpadStartY + dy;

            // Clamp to screen bounds
            newLeft = Math.max(0, Math.min(window.innerWidth - dpadW, newLeft));
            newTop = Math.max(0, Math.min(window.innerHeight - dpadH, newTop));

            dpadEl.style.left = newLeft + 'px';
            dpadEl.style.top = newTop + 'px';
            dpadEl.style.bottom = 'auto';
        }
    }

    function endDrag() {
        dragging = false;
        dpadEl.classList.remove('dragging');
    }

    // D-pad touch drag
    dpadEl.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startDrag(t.clientX, t.clientY);
    }, { passive: true });

    dpadEl.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        moveDrag(t.clientX, t.clientY);
        if (moved) e.preventDefault();
    }, { passive: false });

    dpadEl.addEventListener('touchend', endDrag);
    dpadEl.addEventListener('touchcancel', endDrag);

    // D-pad mouse drag
    dpadEl.addEventListener('mousedown', (e) => {
        startDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', (e) => {
        moveDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', endDrag);

    // Button direction input (only if not dragging)
    dirs.forEach(({ id, key }) => {
        const btn = document.getElementById(id);
        if (!btn) return;

        btn.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            if (!moved) {
                dpad[key] = true;
                btn.classList.add('pressed');
            }
        }, { passive: true });

        btn.addEventListener('touchend', (e) => {
            e.stopPropagation();
            dpad[key] = false;
            btn.classList.remove('pressed');
        });

        btn.addEventListener('touchcancel', () => {
            dpad[key] = false;
            btn.classList.remove('pressed');
        });

        btn.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            if (!moved) {
                dpad[key] = true;
                btn.classList.add('pressed');
            }
        });

        btn.addEventListener('mouseup', () => {
            dpad[key] = false;
            btn.classList.remove('pressed');
        });

        btn.addEventListener('mouseleave', () => {
            dpad[key] = false;
            btn.classList.remove('pressed');
        });
    });
}

// Setup kick button
function setupKickButton() {
    const kickBtn = document.getElementById('kickBtn1');
    const kickContainer = document.getElementById('kickContainer');

    if (kickBtn) {
        kickBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (gameState.running && !isPaused) {
                kickBall(player, CONFIG.kickPower);
                kickBtn.classList.add('pressed');
                if (navigator.vibrate) navigator.vibrate(30);
            }
        }, { passive: false });

        kickBtn.addEventListener('touchend', (e) => {
            kickBtn.classList.remove('pressed');
        });

        kickBtn.addEventListener('click', () => {
            if (gameState.running && !isPaused) {
                kickBall(player, CONFIG.kickPower);
                if (navigator.vibrate) navigator.vibrate(30);
            }
        });
    }

    // Kick button drag
    if (kickContainer) {
        let dragging = false;
        let dragStartX = 0, dragStartY = 0;
        let containerStartX = 0, containerStartY = 0;
        let moved = false;
        const DRAG_THRESHOLD = 10;

        function startDrag(x, y) {
            const rect = kickContainer.getBoundingClientRect();
            dragging = true;
            moved = false;
            dragStartX = x;
            dragStartY = y;
            containerStartX = rect.left;
            containerStartY = rect.top;
            kickContainer.classList.add('dragging');
        }

        function moveDrag(x, y) {
            if (!dragging) return;
            const dx = x - dragStartX;
            const dy = y - dragStartY;
            if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
                moved = true;
            }
            if (moved) {
                const cw = kickContainer.offsetWidth;
                const ch = kickContainer.offsetHeight;
                let newLeft = containerStartX + dx;
                let newTop = containerStartY + dy;

                newLeft = Math.max(0, Math.min(window.innerWidth - cw, newLeft));
                newTop = Math.max(0, Math.min(window.innerHeight - ch, newTop));

                kickContainer.style.left = newLeft + 'px';
                kickContainer.style.top = newTop + 'px';
                kickContainer.style.right = 'auto';
                kickContainer.style.bottom = 'auto';
            }
        }

        function endDrag() {
            dragging = false;
            kickContainer.classList.remove('dragging');
        }

        kickContainer.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
        }, { passive: true });

        kickContainer.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            moveDrag(t.clientX, t.clientY);
            if (moved) e.preventDefault();
        }, { passive: false });

        kickContainer.addEventListener('touchend', endDrag);
        kickContainer.addEventListener('touchcancel', endDrag);

        kickContainer.addEventListener('mousedown', (e) => {
            startDrag(e.clientX, e.clientY);
        });

        document.addEventListener('mousemove', (e) => {
            moveDrag(e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', endDrag);

        kickContainer.addEventListener('contextmenu', (e) => e.preventDefault());
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

    // D-Pad
    if (dpad.up) dy = -1;
    if (dpad.down) dy = 1;
    if (dpad.left) dx = -1;
    if (dpad.right) dx = 1;

    if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        moveEntity(player, dx / len, dy / len);
    }
}

// Swipe-to-kick gesture (right half of screen)
function setupSwipeToKick() {
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch.clientX > window.innerWidth / 2) {
            swipeStart = { x: touch.clientX, y: touch.clientY, time: Date.now() };
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!swipeStart || !gameState.running || isPaused) {
            swipeStart = null;
            return;
        }
        const touch = e.changedTouches[0];
        const dx = touch.clientX - swipeStart.x;
        const dy = touch.clientY - swipeStart.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const elapsed = Date.now() - swipeStart.time;

        if (dist > 30 && elapsed < 300) {
            kickBall(player, CONFIG.kickPower);
            if (navigator.vibrate) navigator.vibrate(20);
        }
        swipeStart = null;
    }, { passive: true });
}

// Pause functionality
function setupPause() {
    const pauseBtn = document.getElementById('pauseBtn');
    if (!pauseBtn) return;

    pauseBtn.addEventListener('click', () => {
        if (!gameState.running) return;
        togglePause();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && gameState.running) {
            togglePause();
        }
    });
}

function togglePause() {
    isPaused = !isPaused;
    const pauseBtn = document.getElementById('pauseBtn');

    if (isPaused) {
        gameState.paused = true;
        pauseBtn.textContent = '>';
        SFX.pause();

        let overlay = document.querySelector('.pause-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'pause-overlay';
            overlay.innerHTML = `
                <h2>PAUSED</h2>
                <button class="pause-sound-btn" id="soundToggle">${soundMuted ? '🔇 Unmute Sound' : '🔊 Mute Sound'}</button>
            `;
            document.querySelector('.game-container').appendChild(overlay);

            document.getElementById('soundToggle').addEventListener('click', toggleSound);
        } else {
            const soundBtn = document.getElementById('soundToggle');
            if (soundBtn) soundBtn.textContent = soundMuted ? '🔇 Unmute Sound' : '🔊 Mute Sound';
        }
        overlay.style.display = 'flex';
    } else {
        gameState.paused = false;
        pauseBtn.textContent = '| |';
        SFX.unpause();

        const overlay = document.querySelector('.pause-overlay');
        if (overlay) overlay.style.display = 'none';
    }
}

function toggleSound() {
    soundMuted = !soundMuted;
    const soundBtn = document.getElementById('soundToggle');
    if (soundBtn) soundBtn.textContent = soundMuted ? '🔇 Unmute Sound' : '🔊 Mute Sound';

    if (ambientGain) {
        ambientGain.gain.value = soundMuted ? 0 : 0.08;
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

    if (gameState.running && !gameState.paused) {
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
    setupDpad();
    setupKickButton();
    setupSwipeToKick();
    setupPause();
    checkMobile();
    gameLoop();
}

// Event listeners
window.addEventListener('resize', () => {
    resizeCanvas();
    checkMobile();
});

document.addEventListener('fullscreenchange', () => {
    resizeCanvas();
});
document.addEventListener('webkitfullscreenchange', () => {
    resizeCanvas();
});

setInterval(updateTimer, 1000);

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
    if (gameState.running && !gameState.paused) {
        e.preventDefault();
    }
}, { passive: false });

// Landscape Mode Lock
function setupLandscapeLock() {
    const overlay = document.getElementById('portraitOverlay');
    const portraitBtn = document.getElementById('portraitBtn');

    if (!overlay) return;

    const isMobileDevice = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024);

    if (!isMobileDevice) {
        overlay.style.display = 'none';
        return;
    }

    function isLandscape() {
        return window.innerWidth > window.innerHeight;
    }

    function updateOverlay() {
        if (isLandscape()) {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'flex';
        }
    }

    updateOverlay();

    window.addEventListener('orientationchange', () => {
        setTimeout(updateOverlay, 150);
    });

    window.addEventListener('resize', () => {
        updateOverlay();
    });

    portraitBtn.addEventListener('click', async () => {
        try {
            const elem = document.documentElement;
            const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
            if (requestFS) {
                await requestFS.call(elem);
            }

            if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape-primary');
            }
        } catch (err) {
            console.log('Orientation/Fullscreen API not available:', err.message);
        }

        resizeCanvas();

        setTimeout(updateOverlay, 200);
        setTimeout(updateOverlay, 500);
        setTimeout(updateOverlay, 1000);
    });
}

// Start
setupLandscapeLock();
init();
