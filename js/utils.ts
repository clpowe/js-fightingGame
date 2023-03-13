import { Fighter } from './classes';
import { player, enemy } from './../index';

export function rectangularCollision({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Fighter;
  rectangle2: Fighter;
}): boolean {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y &&
    rectangle1.isAttacking
  );
}

export function determineWinner({
  player,
  enemy,
  timerId,
}: {
  player: Fighter;
  enemy: Fighter;
  timerId: number;
}) {
  clearTimeout(timerId);
  document.querySelector<HTMLElement>('.message').style.display = 'grid';
  if (player.health === enemy.health) {
    document.querySelector<HTMLElement>('.message').innerHTML = 'Tie';
  }
  if (player.health > enemy.health) {
    document.querySelector<HTMLElement>('.message').innerHTML = 'Player 1 Wins';
  }
  if (player.health < enemy.health) {
    document.querySelector<HTMLElement>('.message').innerHTML = 'Enemy 1 Wins';
  }
}

let timer = 60;
export let timerId;

export function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector<HTMLElement>('#timer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
