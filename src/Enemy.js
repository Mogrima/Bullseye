export class Enemy {
    constructor(game) {
        this.game = game;
        this.collisionRadius = 30;
        // скорость будет рандомной от 0.5 до 3.5
        this.speedX = Math.random() * 3 + 0.5;
        this.image = document.getElementById('toads');
        this.spriteWidth = 140;
        this.spriteHeight = 260;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.collisionX = this.game.width + this.width +
        Math.random() * this.game.width * 0.5;
        this.collisionY = this.game.topMargin +
        (Math.random() * (this.game.height - this.game.topMargin));
        this.spriteX;
        this.spriteY;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 4);
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
        }
    }

    update() {
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height + 40;
        this.collisionX -= this.speedX;
        // повторное использование объектов, путем изменения их положения является хорошей практикой оптимизации
        // чем создавать новые объекты и удалить их потом
        if (this.spriteX + this.width < 0 && !this.game.gameOver) {
            // Math.random() * this.game.width * 0.5 - добавляется к выражению чтобы задать
            //рандомизированную задержку появления врагов
            this.collisionX = this.game.width + this.width +
            Math.random() * this.game.width * 0.5;
            this.collisionY = this.game.topMargin +
            (Math.random() * (this.game.height - this.game.topMargin));
            this.frameY = Math.floor(Math.random() * 4);
        }

        const collisionObjects = [this.game.player, ...this.game.obstacles];
        collisionObjects.forEach(object => {
            const [collison, distance, sumOfRadius, dx, dy] = this.game.checkCollision(this, object);
            if (collison) {
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = object.collisionX + (sumOfRadius + 1) * unit_x;
                this.collisionY = object.collisionY + (sumOfRadius + 1) * unit_y;
            }
        });
    }
}