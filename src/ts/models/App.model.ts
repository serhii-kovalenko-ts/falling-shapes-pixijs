import { Observer } from '../components/observer/observer';
import {
  DEFAULT_CONFIG,
  DEFAULT_GRAVITY,
  DEFAULT_SHAPES_PER_SEC,
} from './App.model.constants';
import { IModelConfig } from './App.model.types';

export class AppModel {
  public config: IModelConfig = { ...DEFAULT_CONFIG };
  public onGravityChanged = new Observer();
  public onShapesChanged = new Observer();
  public onCountChanged = new Observer();
  public onSquareChanged = new Observer();
  public count = 0;
  public square = 0;
  public gravity = DEFAULT_GRAVITY;
  public shapesPerSecond = DEFAULT_SHAPES_PER_SEC;

  public setGravity(value: number): void {
    this.gravity = Math.max(0, value);
    this.onGravityChanged.notification();
  }

  public setShapesPerSecond(value: number): void {
    this.shapesPerSecond = Math.max(0, value);
    this.onShapesChanged.notification();
  }

  public setCount(value: number): void {
    if (this.count === value) return;
    this.count = value;
    this.onCountChanged.notification();
  }

  public setSquare(value: number): void {
    if (this.square === value) return;
    this.square = value;
    this.onSquareChanged.notification();
  }
}
