import { Point } from "pixi.js";
import { Shape } from "./Shape";
import { Circle, Ellipse, Triangle, Rectangle, Pentagon, Hexagon, Star, Chaotic } from "./Shapes";

export enum EShapes {
  Circle = 1,
  Ellipse,
  Triangle,
  Rectangle,
  Pentagon,
  Hexagon,
  Star,
  Chaotic,
}

export class ShapeFactory {
  public createShape(type: EShapes, position?: Point): Shape {
    switch (type) {
      case EShapes.Circle:
        return new Circle(position);
      case EShapes.Ellipse:
        return new Ellipse(position);
      case EShapes.Triangle:
        return new Triangle(position);
      case EShapes.Rectangle:
        return new Rectangle(position);
      case EShapes.Pentagon:
        return new Pentagon(position);
      case EShapes.Hexagon:
        return new Hexagon(position);
      case EShapes.Star:
        return new Star(position);
      case EShapes.Chaotic:
        return new Chaotic(position);
      default:
        return new Chaotic(position);
    }
  }
}
