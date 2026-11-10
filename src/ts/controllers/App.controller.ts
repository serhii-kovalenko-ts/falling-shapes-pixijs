import { Point, Ticker } from "pixi.js";
import { AppModel } from "../models/App.model";
import { AppView } from "../views/App.view";
import { Shape } from "../components/Shape/Shape";
import { EShapes } from "../components/Shape/ShapeFactory";
import { ShapePool } from "../components/pool/ShapePool";
import { getRandomNum, getRandomSpawnPosition } from "../utils/utils";
import { MS_PER_SECOND } from "../models/App.model.constants";

export class AppController {
  private shapes: Shape[] = [];
  private shapePool = new ShapePool();
  private spawnAccumulator = 0;
  private skipNextFrame = false;
  private ticker = () => this.animate();

  public constructor(
    private model: AppModel,
    private view: AppView,
  ) {
    this.subscribeEvents();
    document.addEventListener("visibilitychange", () => {
      this.spawnAccumulator = 0;
      this.skipNextFrame = true;
    });
    Ticker.shared.add(this.ticker);
    this.updateShapes();
  }

  private subscribeEvents(): void {
    this.view.onIncreaseGravity.subscribe(() => this.model.setGravity(this.model.gravity + 0.5));
    this.view.onDecreaseGravity.subscribe(() => this.model.setGravity(this.model.gravity - 0.5));
    this.view.onIncreaseShapes.subscribe(() => this.model.setShapesPerSecond(this.model.shapesPerSecond + 1));
    this.view.onDecreaseShapes.subscribe(() => this.model.setShapesPerSecond(this.model.shapesPerSecond - 1));
    this.view.onCanvasClicked.subscribe((position: Point) => {
      this.drawRandomShape(position);
      this.updateShapes();
    });
    this.view.onShapeClicked.subscribe((shape: Shape) => {
      this.removeShape(shape);
      this.updateShapes();
    });
  }

  private drawRandomShape(position: Point): void {
    const type: number = getRandomNum(EShapes.Circle, EShapes.Chaotic + 1) as EShapes;
    const shape = this.shapePool.getItem(type, position);
    this.shapes.push(shape);
    this.view.drawShape(shape);
  }

  private removeShape(shape: Shape): void {
    const index = this.shapes.indexOf(shape);
    if (index === -1) return;
    this.shapes.splice(index, 1);
    this.view.removeShape(shape);
    this.shapePool.releaseItem(shape);
  }

  private updateShapes(distance = 0): void {
    let count: number = 0;
    let square: number = 0;

    const { width, height } = this.model.config;
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.figure.y += distance;
      const bounds = shape.getBounds();
      if (bounds.top >= height) {
        this.removeShape(shape);
        continue;
      }
      if (bounds.right > 0 && bounds.left < width && bounds.bottom > 0 && bounds.top < height) {
        count++;
        square += shape.getArea();
      }
    }

    this.model.setCount(count);
    this.model.setSquare(Math.round(square));
  }

  private animate(): void {
    if (document.hidden) return;
    if (this.skipNextFrame) {
      this.skipNextFrame = false;
      return;
    }

    const elapsedSeconds = Ticker.shared.elapsedMS / MS_PER_SECOND;
    this.spawnAccumulator += elapsedSeconds;
    const rate = this.model.shapesPerSecond;
    if (rate > 0) {
      const interval = 1 / rate;
      while (this.spawnAccumulator >= interval) {
        this.spawnAccumulator -= interval;
        this.drawRandomShape(getRandomSpawnPosition(this.model.config.width));
      }
    } else this.spawnAccumulator = 0;

    this.updateShapes(this.model.gravity * elapsedSeconds * 60);
  }
}
