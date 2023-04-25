import {Sprite} from "./sprite.js"
export const Player = function(ctx, x, y) {

    const sequences = {
        idle: { x: 96, y: 128, width: 32, height: 32, count: 1, timing: 100, loop: false },
        shoot: { x: 0, y: 128, width: 32, height: 32, count: 4, timing: 100, loop: false },
        die: { x: 0, y: 160, width: 32, height: 32, count: 7, timing: 100, loop: false },
    }

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.idle)
          .setScale(2)
          .useSheet("./asset/Players/players blue x1.png");

    const shoot = function() {
        sprite.setSequence(sequences.shoot);
    };

    const stop = function() {
        sprite.setSequence(sequences.idle);
    };

    const die = function() {
        sprite.setSequence(sequences.die);
    };

    return {
        draw: sprite.draw,
        update: sprite.update,
        shoot: shoot,
        stop: stop,
        die: die,
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox
    };
};
