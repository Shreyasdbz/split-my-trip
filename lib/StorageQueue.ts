/** @format */

export class StorageQueue {
  items: any[];
  isProcessing: boolean;

  constructor() {
    this.items = [];
    this.isProcessing = false;
  }

  public addItem(item: any) {
    this.isProcessing = true;
    this.items.push(item);
    this.isProcessing = false;
  }

  public getAllItems() {
    return this.items;
  }
}
