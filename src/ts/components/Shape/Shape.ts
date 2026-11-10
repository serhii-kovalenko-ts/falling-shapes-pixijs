import { Graphics, Point, Rectangle } from "pixi.js";
import { getRandomColor } from "../../utils/utils";

export abstract class Shape {
  public figure = new Graphics();
  public color = 0;
  private area = 0;
  protected points: number[] = [];

  public constructor(position?: Point) {
    if (position) {
      this.reset(position);
    }
  }

  public reset(position: Point): void {
    this.removeInteraction();
    this.figure.clear();
    this.figure.position.copyFrom(position);
    this.figure.visible = true;
    this.figure.interactive = true;
    this.color = getRandomColor();
    this.figure.lineStyle(2, 0x202020);
    this.figure.beginFill(this.color);
    this.draw();
    this.figure.endFill();
    this.area = this.calculateArea();
  }

  public removeInteraction(): void {
    this.figure.removeAllListeners();
    this.figure.interactive = false;
  }

  public getArea(): number {
    return this.area;
  }

  public getBounds(): Rectangle {
    return this.figure.getBounds();
  }

  protected calculatePolygonArea(points: number[]): number {
    let area = 0;
    for (let i = 0; i < points.length; i += 2) {
      const next = (i + 2) % points.length;
      area += points[i] * points[next + 1] - points[next] * points[i + 1];
    }
    return Math.abs(area) / 2;
  }

  protected abstract calculateArea(): number;

  protected abstract draw(): void;
}
