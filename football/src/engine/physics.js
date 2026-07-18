import { CONFIG } from './config';

export function initGameObjects() {
    const player = {
        x: 100,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.playerRadius,
        color: '#4dabf7',
        vx: 0,
        vy: 0
    };

    const ai = {
        x: CONFIG.fieldWidth - 100,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.playerRadius,
        color: '#ff6b6b',
        vx: 0,
        vy: 0
    };

    const ball = {
        x: CONFIG.fieldWidth / 2,
        y: CONFIG.fieldHeight / 2,
        radius: CONFIG.ballRadius,
        vx: 0,
        vy: 0
    };

    return { player, ai, ball };
}

export function resetPositions(objects) {
    objects.player.x = 100;
    objects.player.y = CONFIG.fieldHeight / 2;
    objects.ai.x = CONFIG.fieldWidth - 100;
    objects.ai.y = CONFIG.fieldHeight / 2;
    objects.ball.x = CONFIG.fieldWidth / 2;
    objects.ball.y = CONFIG.fieldHeight / 2;
    objects.ball.vx = 0;
    objects.ball.vy = 0;
}

export function moveEntity(entity, dx, dy, mobileSpeedMultiplier = 1) {
    const speed = CONFIG.playerSpeed * mobileSpeedMultiplier;
    entity.x += dx * speed;
    entity.y += dy * speed;
    entity.x = Math.max(entity.radius, Math.min(CONFIG.fieldWidth - entity.radius, entity.x));
    entity.y = Math.max(entity.radius, Math.min(CONFIG.fieldHeight - entity.radius, entity.y));
}

export function updateBall(ball, onGoal) {
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
            onGoal('ai');
        } else {
            ball.vx *= -0.8;
            ball.x = ball.radius;
        }
    }

    if (ball.x + ball.radius > CONFIG.fieldWidth) {
        if (inGoalY) {
            onGoal('player');
        } else {
            ball.vx *= -0.8;
            ball.x = CONFIG.fieldWidth - ball.radius;
        }
    }
}

export function checkCollision(entity, ball) {
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

export function kickBall(entity, ball, power, onKick) {
    const dx = ball.x - entity.x;
    const dy = ball.y - entity.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < entity.radius + ball.radius + 15) {
        const nx = dx / dist;
        const ny = dy / dist;
        ball.vx = nx * power;
        ball.vy = ny * power;
        if (onKick) onKick();
        return true;
    }
    return false;
}
