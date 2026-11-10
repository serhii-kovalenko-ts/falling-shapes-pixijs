export abstract class ObjectPool<T> {
  private pool: Array<{ item: T; type: number }> = [];
  private activeItems = new Map<T, number>();

  public constructor(
    private createItem: (type: number) => T,
    private destroyItem: (item: T) => void,
    private maxStoredItems = 100,
  ) {}

  public getItem(type: number): T {
    const index = this.pool.findIndex((entry) => entry.type === type);
    let item: T;
    if (index >= 0) {
      item = this.pool[index].item;
      this.pool.splice(index, 1);
    } else {
      item = this.createItem(type);
    }
    this.activeItems.set(item, type);
    return item;
  }

  public releaseItem(item: T): void {
    const type = this.activeItems.get(item);
    if (type === undefined) {
      throw new Error("Cannot return this object");
    }
    this.prepareForRelease(item);
    this.activeItems.delete(item);
    if (this.pool.length < this.maxStoredItems) {
      this.pool.push({ item, type });
    } else this.destroyItem(item);
  }

  protected abstract prepareForRelease(item: T): void;

  public destroy(): void {
    for (const entry of this.pool) this.destroyItem(entry.item);
    for (const item of this.activeItems.keys()) this.destroyItem(item);
    this.pool.length = 0;
    this.activeItems.clear();
  }
}
