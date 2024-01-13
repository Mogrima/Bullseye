"use strict";
import { Game } from './src/Game.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = '1280';
    canvas.height = '720';
    ctx.fillStyle = 'pink';
    ctx.strokeStyle = 'black';
    ctx.font = '40px Helvetica';
    ctx.textAlign = 'center';
    const game = new Game(canvas);
    game.init();

    let lastTime = 0;
    function animate(timeStamp) {
        const deltatime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.render(ctx, deltatime);
        // if (!game.gameOver) requestAnimationFrame(animate);
        requestAnimationFrame(animate);
    }

    animate(0);
});