import { Player } from './Player.js';
import { Obstacles } from './Obstacles.js';
import { Egg } from './Egg.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.topMargin = 260;
        this.debug = true;

        this.fps = 70;
        this.timer = 0;
        this.interval = 1000/this.fps;

        this.player = new Player(this);
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.maxEggs = 10;
        this.eggs = [];
        this.eggTimer = 0;
        this.eggInterval = 500;
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
        window.addEventListener('keydown', e => {
            if (e.key === 'd') this.debug = !this.debug;
        });
    }

    render(context, deltatime) {
        if (this.timer > this.interval) {
            // clear previous frame
            context.clearRect(0, 0, this.width, this.height);
            // animate next frame
            this.obstacles.forEach(obstacle => obstacle.draw(context));
            this.eggs.forEach(egg => {
                egg.draw(context);
                egg.update();
            });
            this.player.draw(context);
            this.player.update();
            this.timer = 0;
        }
        this.timer += deltatime;

        // add eggs periodically
        if (this.eggTimer > this.eggInterval &&
            this.eggs.length < this.maxEggs) {
            this.addEgg();
            this.eggTimer = 0;
            console.log(this.eggs);
        } else {
            this.eggTimer += deltatime;
        }
    }
    checkCollision(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dy, dx);
        const sumOfRadius = a.collisionRadius + b.collisionRadius;
        return [(distance < sumOfRadius), distance, sumOfRadius, dx, dy];
    }

    addEgg() {
        this.eggs.push(new Egg(this));
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
                    const distanceBuffer = 150;
                    const sumOfRadius = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
                    if (distance < sumOfRadius) {
                        overlap = true;
                    }
                });
                const margin = testObstacle.collisionRadius * 3;
                if (!overlap && testObstacle.spriteX > 0 &&
                    testObstacle.spriteX < this.width - testObstacle.width &&
                    testObstacle.collisionY > this.topMargin + margin &&
                    testObstacle.collisionY < this.height - margin) {
                    this.obstacles.push(testObstacle);
                }
                attempts++;
            }
    }
}