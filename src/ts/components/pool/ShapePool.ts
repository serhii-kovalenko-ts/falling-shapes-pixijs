import { Point } from "pixi.js";
import { EShapes, ShapeFactory } from "../Shape/ShapeFactory";
import { Shape } from "../Shape/Shape";
import { ObjectPool } from "./ObjectPool";

export class ShapePool extends ObjectPool<Shape> {
  public constructor(maxStoredItems = 100) {
    const factory = new ShapeFactory();
    super(
      (type) => factory.createShape(type),
      (shape) => shape.figure.destroy(),
      maxStoredItems,
    );
  }

  public getItem(type: EShapes, position = new Point(0, 0)): Shape {
    const shape = super.getItem(type);
    shape.reset(position);
    return shape;
  }

  protected prepareForRelease(shape: Shape): void {
    shape.removeInteraction();
  }
}
