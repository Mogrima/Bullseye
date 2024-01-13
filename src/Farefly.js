import { Particle } from "./Particle.js";

export class Farefly extends Particle {
    update() {
        this.angle += this.va;
        this.collisionX += this.speedX;
        this.collisionY -= this.speedY;
        if (this.collisionY < 0 - this.radius) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}