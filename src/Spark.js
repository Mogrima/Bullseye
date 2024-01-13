import { Particle } from "./Particle.js";

export class Spark extends Particle {
    update() {
        this.angle += this.va * 0.5;
        // получится кругового движение частицы
        this.collisionX -= Math.sin(this.angle) * this.speedX;
        this.collisionY -= Math.cos(this.angle) * this.speedY;
        // частицы будут сжиматься пока совсем не исчезнут
        if (this.radius > 0.1) this.radius -= 0.05;
        if (this.radius < 0.2) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}