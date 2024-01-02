import { Player } from './Player.js';
import { Obstacles } from './Obstacles.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.player = new Player(this);
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false,
        };

        canvas.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        });
        canvas.addEventListener('mouseup', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        });
        canvas.addEventListener('mousemove', e => {
            if (this.mouse.pressed) {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        });
    }

    render(context) {
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach(obstacle => obstacle.draw(context));
    }

    init() {
        // circle packing
        let attempts = 0;
        while(this.obstacles.length < this.
            numberOfObstacles && attempts < 500) {
                let testObstacle = new Obstacles(this);
                let overlap = false;
                // circle collision detection
                this.obstacles.forEach(obstacle => {
                    const dx = testObstacle.collisionX - obstacle.collisionX;
                    const dy = testObstacle.collisionY - obstacle.collisionY;
                    const distance = Math.hypot(dy, dx);
                    const sumOfRadius = testObstacle.collisionRadius + obstacle.collisionRadius;
                    if (distance < sumOfRadius) {
                        overlap = true;
                    }
                });
                if (!overlap) {
                    this.obstacles.push(testObstacle);
                }
                attempts++;
            }
    }
}