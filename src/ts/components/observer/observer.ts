export class Observer<T = void> {
  private observers: Array<(payload: T) => void> = [];

  public subscribe(callback: (payload: T) => void): void {
    this.observers.push(callback);
  }

  public unsubscribe(callback: (payload: T) => void): void {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  public notification(payload: T): void {
    this.observers.forEach((callback) => callback(payload));
  }
}
