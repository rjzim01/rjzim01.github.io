import { CONFIG } from './config';
import { SFX } from './sound';

let aiLastUpdate = 0;
let aiTarget = { x: 0, y: 0 };

export function updateAI(ball, ai, isMobile, onKick) {
    const now = Date.now();

    return (aiLevel) => {
        const aiConfig = CONFIG.aiDifficulty[aiLevel];
        if (now - aiLastUpdate < aiConfig.reactionDelay) return;
        aiLastUpdate = now;

        const mobilePenalty = isMobile ? 0.85 : 1;
        const effectiveSpeed = aiConfig.speed * mobilePenalty;

        const distToBall = Math.sqrt((ball.x - ai.x) ** 2 + (ball.y - ai.y) ** 2);

        // Corner/edge detection
        const nearLeftWall = ball.x < 60;
        const nearRightWall = ball.x > CONFIG.fieldWidth - 60;
        const nearTopWall = ball.y < 60;
        const nearBottomWall = ball.y > CONFIG.fieldHeight - 60;
        const inCorner = (nearLeftWall || nearRightWall) && (nearTopWall || nearBottomWall);
        const nearAnyWall = nearLeftWall || nearRightWall || nearTopWall || nearBottomWall;

        if (inCorner) {
            aiTarget.x = ball.x + (nearRightWall ? -80 : 80);
            aiTarget.y = CONFIG.fieldHeight / 2;
        } else if (nearAnyWall && ball.x < CONFIG.fieldWidth * 0.3) {
            aiTarget.x = ball.x + 30;
            aiTarget.y = ball.y;
        } else if (ball.x <= CONFIG.fieldWidth * 0.55) {
            aiTarget.x = Math.max(40, ball.x - 50);
            aiTarget.y = ball.y;
        } else {
            aiTarget.x = ball.x - 20;
            aiTarget.y = ball.y;
        }

        if (Math.random() > aiConfig.accuracy) {
            aiTarget.y += (Math.random() - 0.5) * 70;
        }

        aiTarget.x = Math.max(CONFIG.fieldWidth * 0.08, aiTarget.x);
        aiTarget.x = Math.min(CONFIG.fieldWidth * 0.95, aiTarget.x);

        const dx = aiTarget.x - ai.x;
        const dy = aiTarget.y - ai.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            const moveX = (dx / dist) * effectiveSpeed;
            const moveY = (dy / dist) * effectiveSpeed;
            const speed = CONFIG.playerSpeed;
            ai.x += (moveX / speed) * speed;
            ai.y += (moveY / speed) * speed;
            ai.x = Math.max(ai.radius, Math.min(CONFIG.fieldWidth - ai.radius, ai.x));
            ai.y = Math.max(ai.radius, Math.min(CONFIG.fieldHeight - ai.radius, ai.y));
        }

        // Kick the ball when close
        if (distToBall < ai.radius + ball.radius + 20) {
            if (inCorner || nearAnyWall) {
                const escapeX = CONFIG.fieldWidth / 2 - ball.x;
                const escapeY = CONFIG.fieldHeight / 2 - ball.y;
                const escapeDist = Math.sqrt(escapeX * escapeX + escapeY * escapeY) || 1;
                ball.vx = (escapeX / escapeDist) * CONFIG.kickPower * 1.1;
                ball.vy = (escapeY / escapeDist) * CONFIG.kickPower * 1.1;
                SFX.kick();
            } else if (ball.x < CONFIG.fieldWidth * 0.55) {
                const goalX = 0;
                const goalY = CONFIG.fieldHeight / 2;
                const kickDx = goalX - ball.x;
                const kickDy = goalY - ball.y;
                const kickDist = Math.sqrt(kickDx * kickDx + kickDy * kickDy) || 1;
                ball.vx = (kickDx / kickDist) * CONFIG.kickPower * (0.9 + Math.random() * 0.3);
                ball.vy = (kickDy / kickDist) * CONFIG.kickPower * (0.7 + Math.random() * 0.3);
                SFX.kick();
            } else {
                const dx2 = ball.x - ai.x;
                const dy2 = ball.y - ai.y;
                const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
                ball.vx = (dx2 / d2) * CONFIG.kickPower * (0.9 + Math.random() * 0.3);
                ball.vy = (dy2 / d2) * CONFIG.kickPower * (0.9 + Math.random() * 0.3);
                SFX.kick();
            }
        }
    };
}
