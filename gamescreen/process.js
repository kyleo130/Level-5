import { Player } from "./player.js";
import { Enemy, EnemyDeath } from "./enemy.js";
import { Bullet } from "./bullet.js"

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let reqID;

let frameNo = 1;
let defeatedNo = 0;
let defeatedTarget = 30;
let currentBulletID = 1001;

let nextEnemy = 30;

let result;
let submitted = false;
let playerAlive = true;
let spawnEnemies = true;

const colors = ["green", "red"];

const player = Player(context, 144, 208);
let enemies = [];
let deathEnemies = [];
let bullets = [];

let playerBoundingBox = player.getBoundingBox();

export function setResult(val) {
  result = val;
}

export function setSubmitted(val) {
  submitted = val;
}

function sendSuccess() {
  console.log("success");
  document.getElementById("alertSuccess").style.display = "block";
  document.getElementById("alertFail").style.display = "none";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function sendFail() {
  console.log("fail");
  document.getElementById("alertSuccess").style.display = "none";
  document.getElementById("alertFail").style.display = "block";
  document.getElementById("alertProblem").style.display = "none";
  document.getElementById("submit").disabled = false;
  setSubmitted(false);
}

function resetSettings() {
  frameNo = 1;
  defeatedNo = 0;
  defeatedTarget = 30;
  currentBulletID = 1001;
  nextEnemy = 30

  submitted = true;
  playerAlive = true;
  spawnEnemies = true;
  enemies = [];
  deathEnemies = [];
  bullets = [];
}

function doFrame(now) {
    if (submitted && document.getElementById("submit").disabled === false) {
      document.getElementById("submit").disabled = true;
      resetSettings();
      player.stop();
    }
   
    if (submitted) {
      if (defeatedNo >= defeatedTarget) {
        spawnEnemies = false;
        if (enemies.length == 0) {
          setTimeout(sendSuccess, 1000);
        }
      }

      if (playerAlive == false) {
        spawnEnemies = false;
        setTimeout(sendFail, 3000);
      }

      /* Handle enemy spawning */
      if ((frameNo === nextEnemy) && (defeatedNo < defeatedTarget) && (spawnEnemies)) {
        enemies.push(Enemy(context, 640, 120 + Math.random() * 240, colors[Math.floor(Math.random() * 2)]));
        frameNo = 0;
        nextEnemy = Math.floor(Math.random() * 20) + 10;
      }

      frameNo += 1;

      
      if (playerAlive) {
        for (let i = 0; i < enemies.length; i++) {
          const {x, y} = enemies[i].getXY();

          /* Handle shooting bullets */
          if ((x < 300) && (enemies[i].getAimed() == false)) {
            let bulletColor = result.get(enemies[i].getColor());
            console.log(bulletColor)
            if ((bulletColor === "red") || (bulletColor === "green")) {
              bullets.push(Bullet(context, 160, 228, x, y, bulletColor, currentBulletID));
              enemies[i].setAimed(true);
              enemies[i].setBulletID(currentBulletID);
              currentBulletID += 1;
            }
          }

          /* Handle enemy-bullet collision */
          if (enemies[i].getAimed() === true) {
            const bID = enemies[i].getBulletID();
            for (let indexBullet = 0; indexBullet < bullets.length; indexBullet++) {
              if (bullets[indexBullet].getBulletID() === bID) {
                const box = bullets[indexBullet].getBoundingBox();
                if (box.isPointInBox(x, y)) {
                  if (bullets[indexBullet].getColor() == enemies[i].getColor()) {
                    const nowEnemyColor = enemies[i].getColor();
                    deathEnemies.push(EnemyDeath(context, x, y, nowEnemyColor));
                    enemies.splice(i, 1);
                    defeatedNo += 1;
                  }    
                  bullets.splice(i, 1);
                }
              }
            }
          }

          /* Handle hero-enemy collision */
          if (playerBoundingBox.isPointInBox(x, y)) {
              player.die();
              playerAlive = false;
              for (let indexEnemy = 0; indexEnemy < enemies.length; indexEnemy++) {
                enemies[indexEnemy].stop();
              }
          }
        }
      }
    }

    /* Update the sprites */
    player.update(now);
    
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].update(now);
    }

    for (let i = 0; i < deathEnemies.length; i++) {
      deathEnemies[i].update(now);
    }

    for (let i = 0; i < bullets.length; i++) {
      bullets[i].update(now);
    }

    /* Clear the screen */
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the sprites */
    player.draw();
    
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].draw();
    }

    for (let i = 0; i < deathEnemies.length; i++) {
      deathEnemies[i].draw();
    }

    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw();
    }
    
    /* Process the next frame */
    reqID = requestAnimationFrame(doFrame);
}

/* Start the animation */
reqID = requestAnimationFrame(doFrame);