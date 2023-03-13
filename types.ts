export type Positon = {
  x: number;
  y: number;
};

export type Velocity = {
  x: number;
  y: number;
};

export type Pressed = boolean;

export type A = {
  pressed: Pressed;
};
export type D = {
  pressed: Pressed;
};
export type W = {
  pressed: Pressed;
};
export type ArrowRight = {
  pressed: Pressed;
};
export type ArrowLeft = {
  pressed: Pressed;
};
export type ArrowUp = {
  pressed: Pressed;
};
export type ArrowDown = {
  pressed: Pressed;
};
export type Space = {
  pressed: Pressed;
};

export type Keys = {
  a?: A;
  d?: D;
  w?: W;
  ' '?: Space;
  arrowRight?: ArrowRight;
  arrowLeft?: ArrowLeft;
  arrowUp?: ArrowUp;
  arrowDown?: ArrowDown;
};

export interface Sprite {
  position: Positon;
  velocity: Velocity;
  height: number;
  lastKey: string;
  attackBox: AttackBox;
  color: string;
  width: number;
  isAttacking: boolean;
  offset: Positon;
  health: number;
  framesCurrent?: number;
  framesElapsed?: number;
  framesHold?: number;
}

export interface SpriteProperties {
  position: Positon;
  width?: number;
  height?: number;
  imageSrc: string;
  scale?: number;
  framesMax?: number;
  framesCurrent?: number;
  framesElapsed?: number;
  framesHold?: number;
  offset?: Positon;
}

export interface FighterProperties extends SpriteProperties {
  velocity: Velocity;
  lastKey?: string;
  color?: string;
  offset: Positon;
  sprites?: Sprites;
  attackBox?: AttackBox;
}

export type AttackBox = {
  position?: Positon;
  width: number;
  height: number;
  offset: Positon;
};

type ImgSprite = {
  imageSrc: string;
  framesMax: number;
  image?: HTMLImageElement;
};

export type Sprites = {
  idle: ImgSprite;
  run: ImgSprite;
  jump: ImgSprite;
  fall: ImgSprite;
  attack1: ImgSprite;
  takeHit: ImgSprite;
  death: ImgSprite;
};
