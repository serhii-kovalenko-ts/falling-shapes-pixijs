import { getRandomNum } from "../../utils/utils";
import { Shape } from "./Shape";

export class Circle extends Shape {
  public draw(): void {
    this.figure.drawCircle(0, 0, 50);
  }

  protected calculateArea(): number {
    return Math.PI * 50 * 50;
  }
}

export class Ellipse extends Shape {
  public draw(): void {
    this.figure.drawEllipse(0, 0, 80, 30);
  }

  protected calculateArea(): number {
    return Math.PI * 80 * 30;
  }
}

export class Rectangle extends Shape {
  public draw(): void {
    this.figure.drawRect(-40, -40, 80, 80);
  }

  protected calculateArea(): number {
    return 80 * 80;
  }
}

export class Triangle extends Shape {
  public draw(): void {
    this.points = [-50, -25, 50, -25, 0, 50];
    this.figure.drawPolygon(this.points);
  }

  protected calculateArea(): number {
    return this.calculatePolygonArea(this.points);
  }
}

export class Pentagon extends Shape {
  public draw(): void {
    this.points = [50, 0, 20, 40, -40, 40, -40, -40, 20, -40];
    this.figure.drawPolygon(this.points);
  }

  protected calculateArea(): number {
    return this.calculatePolygonArea(this.points);
  }
}

export class Hexagon extends Shape {
  public draw(): void {
    this.points = [50, 25, 0, 50, -50, 25, -50, -25, 0, -50, 50, -25];
    this.figure.drawPolygon(this.points);
  }

  protected calculateArea(): number {
    return this.calculatePolygonArea(this.points);
  }
}

export class Star extends Shape {
  public draw(): void {
    this.points = [0, -50, 14, -19, 48, -15, 22, 7, 29, 40, 0, 23, -29, 40, -22, 7, -48, -15, -14, -19];
    this.figure.drawPolygon(this.points);
  }

  protected calculateArea(): number {
    return this.calculatePolygonArea(this.points);
  }
}

export class Chaotic extends Shape {
  public draw(): void {
    this.points = [
      getRandomNum(20, 75),
      getRandomNum(10, 50),
      0,
      getRandomNum(40, 75),
      getRandomNum(-75, -20),
      getRandomNum(10, 50),
      getRandomNum(-75, -20),
      getRandomNum(-50, -10),
      0,
      getRandomNum(-75, -40),
      getRandomNum(20, 75),
      getRandomNum(-50, -10),
    ];
    this.figure.drawPolygon(this.points);
  }

  protected calculateArea(): number {
    return this.calculatePolygonArea(this.points);
  }
}
