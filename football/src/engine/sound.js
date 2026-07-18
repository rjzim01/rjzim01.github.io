const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let soundMuted = false;
let ambientNode = null;
let ambientGain = null;

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

export const SFX = {
    kick() {
        playNoise(0.12, 0.4);
        playTone(200, 0.1, 'sine', 0.3, 80);
    },
    goal(scoredBy) {
        if (scoredBy === 'player') {
            playTone(523, 0.15, 'sine', 0.3);
            setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 120);
            setTimeout(() => playTone(784, 0.25, 'sine', 0.35), 240);
            setTimeout(() => playTone(1047, 0.4, 'sine', 0.3), 400);
        } else {
            playTone(600, 0.2, 'sine', 0.3, 300);
            setTimeout(() => playTone(300, 0.4, 'sawtooth', 0.15), 200);
        }
    },
    whistle() {
        playTone(1800, 0.15, 'sine', 0.25);
        setTimeout(() => playTone(2200, 0.35, 'sine', 0.3), 150);
    },
    whistleLong() {
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
    countdown() {
        playTone(600, 0.15, 'sine', 0.25);
    }
};

export function startAmbient() {
    try {
        const ctx = getAudioCtx();
        if (ambientNode) return;

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        let lastVal = 0;
        for (let i = 0; i < bufferSize; i++) {
            const noise = Math.random() * 2 - 1;
            lastVal = lastVal * 0.97 + noise * 0.03;
            data[i] = lastVal * 3;
        }

        ambientNode = ctx.createBufferSource();
        ambientNode.buffer = buffer;
        ambientNode.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 1;

        ambientGain = ctx.createGain();
        ambientGain.gain.value = soundMuted ? 0 : 0.08;

        ambientNode.connect(filter);
        filter.connect(ambientGain);
        ambientGain.connect(ctx.destination);
        ambientNode.start();
    } catch (e) {}
}

export function stopAmbient() {
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

export function getSoundMuted() {
    return soundMuted;
}

export function setSoundMuted(muted) {
    soundMuted = muted;
    if (ambientGain) {
        ambientGain.gain.value = muted ? 0 : 0.08;
    }
}
