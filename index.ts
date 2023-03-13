import * as type from './types';
import { Sprite, Fighter } from './js/classes';
import {
  rectangularCollision,
  determineWinner,
  decreaseTimer,
  timerId,
} from './js/utils';

import './style.css';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `
<div class="scorboard">
  <!-- player health -->
  <div class="playerHealth-Container">
    <div  class="player-health"></div>
    <div id="playerHealth" class="player-health-bar"></div>
  </div>

  <!-- timer -->
  <div id="timer" class="game-timer">
  10
  </div>

  <!-- enemy health -->
  <div class="enemyHealth-Container">
    <div  class="enemy-health"></div>
    <div id="enemyHealth" class="enemy-health-bar"></div>
  </div>
</div>
<div class="message">Tie</div>
<canvas></canvas>`;

export const canvas = <HTMLCanvasElement>document.querySelector('canvas');
export const c = canvas.getContext('2d');

c.fillRect(0, 0, canvas.width, canvas.height);
canvas.width = 1024;
canvas.height = 576;

export const gravity: number = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc:
    'https://ik.imagekit.io/cpds/CLP/background_FU0LPInGSC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678503273183',
});
const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc:
    'https://ik.imagekit.io/cpds/CLP/shop_ie3Y0REV0.png?updatedAt=1678503331630',
  scale: 2.75,
  framesMax: 6,
});

export const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  scale: 2.5,
  imageSrc:
    'https://ik.imagekit.io/cpds/CLP/samuraiMack/Idle_FbbtRLUGZ.png?updatedAt=1678503349772',
  framesMax: 8,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Idle_FbbtRLUGZ.png?updatedAt=1678503349772',
      framesMax: 8,
    },
    run: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Run_YaBXsfDxJC.png?updatedAt=1678503349170',
      framesMax: 8,
    },
    jump: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Jump_BMMiax9kQi.png?updatedAt=1678503349288',
      framesMax: 2,
    },
    fall: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Fall_X807Vnxkh4.png?updatedAt=1678503349915',
      framesMax: 2,
    },
    attack1: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Attack1_HJMSAt-YR3.png?updatedAt=1678503349309',
      framesMax: 6,
    },
    takeHit: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Take_Hit_-_white_silhouette_bVMKqLPIv.png?updatedAt=1678503348564',
      framesMax: 4,
    },
    death: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/samuraiMack/Death_t-Up7Z4U7x.png?updatedAt=1678503349710',
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});

export const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc:
    'https://ik.imagekit.io/cpds/CLP/kenji/Idle_lOmf0qALm.png?updatedAt=1678503348763',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 168,
  },
  sprites: {
    idle: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Idle_lOmf0qALm.png?updatedAt=1678503348763',
      framesMax: 4,
    },
    run: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Run_BRXd8sSb7.png?updatedAt=1678503349300',
      framesMax: 8,
    },
    jump: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Jump_cefy1rG9f.png?updatedAt=1678503348688',
      framesMax: 2,
    },
    fall: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Fall_HbjcGjU5R.png?updatedAt=1678503348750',
      framesMax: 2,
    },
    attack1: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Attack1_M7UJp_KoW.png?updatedAt=1678503349704',
      framesMax: 4,
    },
    takeHit: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Take_hit_f09of1fVFY.png?updatedAt=1678503348565',
      framesMax: 3,
    },
    death: {
      imageSrc:
        'https://ik.imagekit.io/cpds/CLP/kenji/Death_-uQvH9MYF.png?updatedAt=1678503348606',
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50,
    },
    width: 170,
    height: 50,
  },
});

const keys: type.Keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
  ' ': {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  c.fillStyle = 'rgba(255,255,255, .15)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Player Movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // Enemy Movement

  if (keys.arrowLeft.pressed && enemy.lastKey === 'arrowLeft') {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else if (keys.arrowRight.pressed && enemy.lastKey === 'arrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  }

  // Detect for collision && enemy gets hit
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    gsap.to('#enemyHealth', {
      width: enemy.health + '%',
    });
  }

  //if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    gsap.to('#playerHealth', {
      width: player.health + '%',
    });
  }

  //if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  const playerkey = {
    d: () => {
      keys.d.pressed = true;
      player.lastKey = 'd';
    },
    a: () => {
      keys.a.pressed = true;
      player.lastKey = 'a';
    },
    w: () => {
      player.velocity.y = -20;
    },
    ' ': () => {
      player.attack();
    },
    default: (): boolean => true,
  };
  const enemykey = {
    ArrowRight: () => {
      keys.arrowRight.pressed = true;
      enemy.lastKey = 'arrowRight';
    },
    ArrowLeft: () => {
      keys.arrowLeft.pressed = true;
      enemy.lastKey = 'arrowLeft';
    },
    ArrowDown: () => {
      enemy.attack();
    },
    ArrowUp: () => {
      enemy.velocity.y = -20;
    },
    default: (): boolean => true,
  };

  if (!player.dead) {
    (playerkey[event.key] || playerkey['default'])();
  }
  if (!enemy.dead) {
    (enemykey[event.key] || enemykey['default'])();
  }
});
window.addEventListener('keyup', (event) => {
  const key = {
    d: () => (keys.d.pressed = false),
    a: () => (keys.a.pressed = false),
    w: () => (keys.w.pressed = false),
    ArrowRight: () => (keys.arrowRight.pressed = false),
    ArrowLeft: () => (keys.arrowLeft.pressed = false),
    ArrowUp: () => (keys.arrowUp.pressed = false),
    default: (): boolean => false,
  };

  (key[event.key] || key['default'])();
});
