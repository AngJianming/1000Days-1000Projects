const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = canvas.width / 20;
const drop = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = '20px monospace'


    for (let i = 0; i < drop.lenght; i++) {
        const text = String.fromCharCode(Math.floor(Math.ramdom() * 128));
        ctx.fillText(text, i * 20, drop[i] * 20);

        if (drop[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drop[i]++;
    }
}