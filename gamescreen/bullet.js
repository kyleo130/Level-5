import { Sprite } from "./sprite.js"
export const Bullet = function(ctx, x, y, targetX, targetY, color, bID) {

    const sequences = { 
        red:  { x: 224, y: 224, width: 32, height: 32, count: 1, timing: 100, loop: false },
        green: { x: 256, y: 224, width: 32, height: 32, count: 1, timing: 100, loop: false }
     };

    const sprite = Sprite(ctx, x, y);

    let deltaX = (targetX - x) / 60;
    let deltaY = (targetY - y) / 60;
    const bulletID = bID;
    
    if (color == "red") {
        sprite.setSequence(sequences.red)
            .useSheet("asset/Props and Items/props and items x1.png");
    }

    if (color == "green") {
        sprite.setSequence(sequences.green)
            .useSheet("asset/Props and Items/props and items x1.png");
    }

    const setRed = function() {
        sprite.setSequence(sequences.red);
    };

    const setGreen = function() {
        sprite.setSequence(sequences.green);
    };

    const getBulletID = function() {
        return bulletID;
    }

    const getColor = function() {
        return color;
    }
    
    const update = function(time) {
        let { x, y } = sprite.getXY();

        x += deltaX;
        y += deltaY;

        sprite.setXY(x, y);
        sprite.update(time);
    };

    return {
        setRed: setRed,
        setGreen: setGreen,
        draw: sprite.draw,
        update: update,
        getBulletID: getBulletID,
        getColor: getColor,
        getBoundingBox: sprite.getBoundingBox
    };
};