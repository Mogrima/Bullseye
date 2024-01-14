import { Particle } from './Particle.js';

export class Farefly extends Particle {
    update() {
        this.angle += this.va;
        // чтобы частица раскачивалась вправо-влево нужно умножить постоянно
        // увеличивающийся синус угла на массу
        this.collisionX += Math.cos(this.angle) * this.speedX;
        this.collisionY -= this.speedY;
        if (this.collisionY < 0 - this.radius) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}