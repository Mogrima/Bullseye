export class Player {
    constructor(game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifer = 50;
    }

    update() {
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        const distance = Math.hypot(this.dy, this.dx);
        if (distance > this.speedModifer) {
            this.speedX = this.dx/distance || 0;
            this.speedY = this.dy/distance || 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
        this.collisionX += this.speedX * this.speedModifer;
        this.collisionY += this.speedY * this.speedModifer;
        // collisions with obstacles
        this.game.obstacles.forEach(obstacle => {
            // destructuring assignment
            let [collision, distance, sumOfRadius, dx, dy] = this.game.checkCollision(this, obstacle);
            if (collision) {
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = obstacle.collisionX +
                (sumOfRadius + 1) * unit_x;
                this.collisionY = obstacle.collisionY +
                (sumOfRadius + 1) * unit_y;
            }
        })
    }
    
    draw(context) {
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();
    }
}