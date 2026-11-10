import { Application, Rectangle, Container, Point, Graphics } from "pixi.js";
import { Observer } from "../components/observer/observer";
import { AppModel } from "../models/App.model";
import { Shape } from "../components/Shape/Shape";

export class AppView {
  private app: Application<HTMLCanvasElement>;

  private increaseShapes!: HTMLButtonElement;
  private decreaseShapes!: HTMLButtonElement;
  private increaseGravity!: HTMLButtonElement;
  private decreaseGravity!: HTMLButtonElement;

  private gravityInput!: HTMLInputElement;
  private shapesInput!: HTMLInputElement;
  private numberOfShapesInput!: HTMLInputElement;
  private coveredAreaInput!: HTMLInputElement;

  public onIncreaseShapes = new Observer();
  public onDecreaseShapes = new Observer();
  public onIncreaseGravity = new Observer();
  public onDecreaseGravity = new Observer();
  public onCanvasClicked = new Observer<Point>();
  public onShapeClicked = new Observer<Shape>();
  private resizeObserver: ResizeObserver;
  private shapeLayer: Container;
  private container: HTMLElement;

  public constructor(private model: AppModel) {
    this.app = new Application<HTMLCanvasElement>({
      width: this.model.config.width,
      height: this.model.config.height,
      backgroundColor: 0x7d1e67,
    });

    this.container = this.getHTMLElement("#app");
    this.container.appendChild(this.app.view);
    this.shapeLayer = new Container();
    const mask = new Graphics().beginFill(0xffffff).drawRect(0, 0, this.model.config.width, this.model.config.height).endFill();
    this.app.stage.addChild(mask, this.shapeLayer);
    this.shapeLayer.mask = mask;
    this.resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.container);

    this.initialize();
  }

  private getHTMLElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  private createQueryElements(): void {
    this.increaseShapes = this.getHTMLElement("#increaseShapes");
    this.decreaseShapes = this.getHTMLElement("#decreaseShapes");

    this.increaseGravity = this.getHTMLElement("#increaseGravity");
    this.decreaseGravity = this.getHTMLElement("#decreaseGravity");

    this.numberOfShapesInput = this.getHTMLElement("#numberOfShapes");
    this.coveredAreaInput = this.getHTMLElement("#coveredArea");

    this.gravityInput = this.getHTMLElement("#gravityValue");
    this.shapesInput = this.getHTMLElement("#shapesValue");
  }

  private addListeners(): void {
    this.increaseShapes.addEventListener("click", () => this.onIncreaseShapes.notification());
    this.decreaseShapes.addEventListener("click", () => this.onDecreaseShapes.notification());

    this.increaseGravity.addEventListener("click", () => this.onIncreaseGravity.notification());
    this.decreaseGravity.addEventListener("click", () => this.onDecreaseGravity.notification());

    this.app.stage.on("pointertap", (e) => {
      this.onCanvasClicked.notification(e.getLocalPosition(this.app.stage));
    });
  }

  private updateInputs(): void {
    this.updateShapesQuantity();
    this.updateGravity();
    this.updateCount();
    this.updateSquare();
  }

  private updateShapesQuantity(): void {
    this.shapesInput.value = this.model.shapesPerSecond.toString();
  }

  private updateGravity(): void {
    this.gravityInput.value = this.model.gravity.toString();
  }

  private updateCount(): void {
    this.numberOfShapesInput.value = this.model.count.toString();
  }

  private updateSquare(): void {
    this.coveredAreaInput.value = this.model.square.toString();
  }

  private subscribeModel(): void {
    this.model.onShapesChanged.subscribe(() => this.updateShapesQuantity());
    this.model.onGravityChanged.subscribe(() => this.updateGravity());
    this.model.onCountChanged.subscribe(() => this.updateCount());
    this.model.onSquareChanged.subscribe(() => this.updateSquare());
  }

  private initialize(): void {
    this.createQueryElements();

    this.updateInputs();
    this.subscribeModel();

    this.addListeners();

    this.app.stage.interactive = true;
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = new Rectangle(0, 0, this.model.config.width, this.model.config.height);
  }

  public drawShape(shapeInstance: Shape): void {
    const shape = shapeInstance.figure;
    this.shapeLayer.addChild(shape);

    shape.on("pointertap", (e) => {
      e.stopPropagation();
      this.onShapeClicked.notification(shapeInstance);
    });
  }

  public removeShape(shapeInstance: Shape): void {
    const shape = shapeInstance.figure;
    this.shapeLayer.removeChild(shape);
  }

  private resizeCanvas(): void {
    const scale = Math.min(1, this.container.clientWidth / this.model.config.width);
    this.app.renderer.view.style.width = `${this.model.config.width * scale}px`;
    this.app.renderer.view.style.height = `${this.model.config.height * scale}px`;
  }
}
