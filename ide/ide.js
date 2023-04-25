import {setResult, setSubmitted} from "../gamescreen/process.js"

ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});

/*
let mapAttack = new Map();
mapAttack.set("red", "undefined");
mapAttack.set("green", "undefined");

class Enemy {
    #color;
    constructor(color) {
        this.#color = color;
    }

    getColor() {
        return this.#color;
    }
}

class Hero {
    redBullet = "red";
    greenBullet = "green";

    attack(enemy, bullet) {
        if (enemy instanceof Enemy == false) {
            return;
        }

        if (bullet instanceof String == false) {
            return;
        }

        mapAttack.set(enemy.getColor(), bullet);
    }
}

function attackEnemy(hero, enemy) {
    hero.attack(enemy, hero.redBullet);
}

let redEnemy = new Enemy("red");
let greenEnemy = new Enemy("green");
let theHero = new Hero();

attackEnemy(theHero, redEnemy);
attackEnemy(theHero, greenEnemy);

mapAttack;
*/

let skeletonBefore =
`let mapAttack = new Map();
mapAttack.set("red", "na");
mapAttack.set("green", "na");

class Enemy {
    #color;
    constructor(color) {
        this.#color = color;
    }

    getColor() {
        return this.#color;
    }
}

class Hero {
    redBullet = "red";
    greenBullet = "green";

    attack(enemy, bullet) {
        if (enemy instanceof Enemy == false) {
            return;
        }

        if (typeof bullet != "string") {
            console.log("Bullet")
            return;
        }
        mapAttack.set(enemy.getColor(), bullet);
    }
}
`

let defaultCode = 
`// class Enemy {
//    #color; // either "red" or "green"
//    getColor() {
//        return this.#color;
//    }
// }
//
// class Hero {
//    redBullet;
//    greenBullet;
//
//    attack(enemy, bullet) { ... } 
//    // Implementation is hidden
// }
//
// let hero = Hero();
// let enemy = Enemy();

// Complete function attackEnemy().
// Parameters: hero -- object of Class Hero
//             enemy -- object of Class Enemy

function attackEnemy(hero, enemy) {
    hero.attack(enemy, hero.redBullet);
}
`

let answerCode =
`function attackEnemy(hero, enemy) {
    if (enemy.getColor() == "red") {
        hero.attack(enemy, hero.redBullet);
    }

    if (enemy.getColor() == "green") {
        hero.attack(enemy, hero.greenBullet);
    }
}
`

let skeletonAfter = 
`let redEnemy = new Enemy("red");
let greenEnemy = new Enemy("green");
let theHero = new Hero();

attackEnemy(theHero, redEnemy);
attackEnemy(theHero, greenEnemy);

mapAttack;
`

editor.session.setValue(answerCode);

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");

submitButton.addEventListener('click', function() {
    let code = editor.getValue();
    try {
        let result = eval(skeletonBefore + code + skeletonAfter);
        setResult(result);
        setSubmitted(true);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "none";
    } catch (err) {
        console.error(err);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "block";
    }
}, false);

resetButton.addEventListener('click', function() {
    try {
        editor.session.setValue(defaultCode);
    } catch (error) {
        console.log(error);
    }
}, false);