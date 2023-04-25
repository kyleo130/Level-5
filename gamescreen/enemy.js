import { Sprite } from "./sprite.js";
export const Enemy = function(ctx, x, y, color) {

    const sequencesRed = {
        idle:  { x: 224, y: 224, width: 32, height: 32, count: 1, timing: 90, loop: false },
        move: { x: 128, y: 320, width: 32, height: 32, count: 4, timing: 90, loop: true },
        death: { x: 288, y: 384, width: 32, height: 32, count: 8, timing: 70, loop: false }
    };

    const sequencesGreen = {
        idle:  { x: 288, y: 384, width: 32, height: 32, count: 1, timing: 90, loop: false },
        move: { x: 288, y: 416, width: 32, height: 32, count: 4, timing: 90, loop: true },
        death: { x: 288, y: 480, width: 32, height: 32, count: 9, timing: 70, loop: false }
    }

    const sprite = Sprite(ctx, x, y);
    let aimed = false;
    let bulletID = -1;
    let moving = true;
    const deltaX = (x - 144) / 360;
    const deltaY = (y - 208) / 360;

    if (color == "green") {
        sprite.setSequence(sequencesGreen.move)
          .setScale(1.5)
          .useSheet("./asset/Enemies/enemies_x1_flip.png");
    } else if (color == "red") {
        sprite.setSequence(sequencesRed.move)
          .setScale(1.5)
          .useSheet("./asset/Players/players_red_x1_flip.png");
    }

    const move = function() {
        moving = true;
        if (color == "green") {
            sprite.setSequence(sequencesGreen.move);
        } else if (color == "red") {
            sprite.setSequence(sequencesRed.move);
        }
    };

    const stop = function() {
        moving = false;
        if (color == "green") {
            sprite.setSequence(sequencesGreen.idle);
        } else if (color == "red") {
            sprite.setSequence(sequencesRed.idle);
        }
    };

    const die = function() {
        moving = false;
        if (color == "green") {
            sprite.setSequence(sequencesGreen.death);
        } else if (color == "red") {
            sprite.setSequence(sequencesRed.death);
        }
        setTimeout(() => {
            delete this;
        }, 500)
    }

    const setAimed = function() {
        aimed = true;
    }

    const getAimed = function() {
        return aimed;
    }

    const setBulletID = function(id) {
        bulletID = id;
    }

    const getBulletID = function() {
        return bulletID;
    }

    const getColor = function() {
        return color;
    }

    const update = function(time) {
        let { x, y } = sprite.getXY();

        if (moving) {
            x -= deltaX;
            y -= deltaY;
        }

        sprite.setXY(x, y);
        sprite.update(time);
    };

    /*
    const draw = function() {
        ctx.save();

        let {x, y} = sprite.getXY();
        ctx.translate(x + 32, y);
        ctx.scale(-1,1);

        sprite.draw();

        ctx.setTransform(1,0,0,1,0,0);
        ctx.restore();
    }
    */

    /*
    const draw = function() {
         ctx.save();
         const size = sprite.getDisplaySize();
 
         ctx.imageSmoothingEnabled = false;
         ctx.drawImage(
             sprite.sheet,
             sprite.sequence.x - sprite.index * sprite.sequence.width,
             sprite.sequence.y,
             sprite.sequence.width,
             sprite.sequence.height,
             parseInt(sprite.x - size.width / 2),
             parseInt(y - size.height / 2),
             size.width,
             size.height
         )

         ctx.restore();
    }
    */

    return {
        move: move,
        stop: stop,
        die: die,
        setAimed: setAimed,
        getAimed: getAimed,
        setBulletID: setBulletID,
        getBulletID: getBulletID,
        getBoundingBox: sprite.getBoundingBox,
        getXY: sprite.getXY,
        getColor: getColor,
        update: update,
        draw: sprite.drawFlipped
    };
};

export const EnemyDeath = function(ctx, x, y, color) {
    const sequencesRed = {
        death: { x: 288, y: 384, width: 32, height: 32, count: 8, timing: 70, loop: false }
    };

    const sequencesGreen = {
        death: { x: 288, y: 480, width: 32, height: 32, count: 9, timing: 70, loop: false }
    };

    const sprite = Sprite(ctx, x, y);

    if (color == "green") {
        sprite.setSequence(sequencesGreen.death)
          .setScale(1.5)
          .useSheet("./asset/Enemies/enemies_x1_flip.png");
    } else if (color == "red") {
        sprite.setSequence(sequencesRed.death)
          .setScale(1.5)
          .useSheet("./asset/Players/players_red_x1_flip.png");
    }

    return {
        update: sprite.update,
        draw: sprite.drawFlipped
    };
};