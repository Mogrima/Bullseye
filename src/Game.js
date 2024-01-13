import { Player } from './Player.js';
import { Obstacles } from './Obstacles.js';
import { Egg } from './Egg.js';
import { Enemy } from './Enemy.js';

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

        this.maxEggs = 20;
        this.eggs = [];
        this.eggTimer = 0;
        this.eggInterval = 1000;

        this.enemies = [];

        this.gameObjects = [];
        this.score = 0;
        this.lostHatchlings = 0;
        this.hatchlings = [];
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
            // combine all game objects into one array
            this.gameObjects = [this.player, ...this.eggs, ...this.obstacles,
                ...this.enemies, ...this.hatchlings];
            // sort by vertical position
            this.gameObjects.sort((a, b) =>{
                return a.collisionY - b.collisionY;
            });
            // animate next frame
            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltatime);
            });
            this.timer = 0;
        }
        this.timer += deltatime;

        // add eggs periodically
        if (this.eggTimer > this.eggInterval &&
            this.eggs.length < this.maxEggs) {
            this.addEgg();
            this.eggTimer = 0;
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

    addEnemy() {
        this.enemies.push(new Enemy(this));
    }

    removeGameObjects(array) {
        array = array.filter(object => !object.markedForDeletion);
        return array;
    }

    init() {
        for (let i = 0; i < 3; i++) {
            this.addEnemy();
        }
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