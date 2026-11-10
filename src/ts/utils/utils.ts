import { Point } from "pixi.js";
import { DEFAULT_CONFIG, SPAWN_POSITION } from "../models/App.model.constants";

export function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor(): number {
  return Math.floor(Math.random() * 0x1000000);
}

export function getRandomSpawnPosition(width = DEFAULT_CONFIG.width): Point {
  return new Point(Math.random() * width, -SPAWN_POSITION);
}
