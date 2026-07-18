import { CONFIG } from './config';

export function drawField(ctx) {
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

    ctx.fillStyle = '#4dabf7';
    ctx.fillRect(0, goalY, CONFIG.goalWidth, CONFIG.goalHeight);

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

export function drawPlayer(ctx, p, isPlayer, displayW, displayH) {
    const sx = displayW / CONFIG.fieldWidth;
    const sy = displayH / CONFIG.fieldHeight;

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

export function drawBall(ctx, ball, displayW, displayH, time) {
    const sx = displayW / CONFIG.fieldWidth;
    const sy = displayH / CONFIG.fieldHeight;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(ball.x + 2, ball.y + ball.radius, ball.radius * 0.8 / sx, ball.radius * 0.3 / sy, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y, ball.radius / sx, ball.radius / sy, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#333';
    const angle = time / 200;
    for (let i = 0; i < 5; i++) {
        const a = angle + (i * Math.PI * 2 / 5);
        const px = ball.x + Math.cos(a) * ball.radius * 0.5 / sx;
        const py = ball.y + Math.sin(a) * ball.radius * 0.5 / sy;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}
