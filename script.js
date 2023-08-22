const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.size -= 0.05;
        if (this.size < 0) this.size = 0;
        this.y += this.weight;
        this.weight += 0.2;

        if (this.y > canvas.height - this.size) {
            this.weight *= -1;
        }
    }
}

let particles = [];

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size == 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function createHeart() {
    const x = canvas.width / 2;
    const y = canvas.height / 2 - 50;

    // Heart shape particles
    for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distanceFromCenter = Math.random() * 20 + 70;
        const positionX = x + Math.sin(angle) * distanceFromCenter;
        const positionY = y - Math.cos(angle) * distanceFromCenter;

        particles.push(new Particle(positionX, positionY, 5, 'red', -1));
    }

    // Exploding particles
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distanceFromCenter = Math.random() * 50;
        const positionX = x + Math.sin(angle) * distanceFromCenter;
        const positionY = y - Math.cos(angle) * distanceFromCenter;

        particles.push(new Particle(positionX, positionY, 3, 'pink', Math.random() * 3 - 1));
    }
}

setInterval(createHeart, 2000);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleParticles();

    requestAnimationFrame(animate);
}

animate();
