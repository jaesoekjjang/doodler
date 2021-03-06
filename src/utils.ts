import { ToolTypes } from './drawing/models/TooTypes';

export const basicColors = [
  '#000000',
  '#787878',
  '#ffffff',
  '#FEAFA8',
  '#eab308',
  '#22c55e',
  '#ef4444',
  '#FF7829',
  '#017420',
  '#99004E',
  '#964112',
  '#0050CD',
];

export const convertToInputWidth = (lineWidth: number) => {
  return ((lineWidth - 1) / 7) * 50;
};

export const convertToToolWidth = (lineWidth: number) => {
  return (lineWidth / 50) * 7 + 1;
};

export const cursorRadius = (toolType: ToolTypes, lineWidth: number) => {
  //? 1.2배 해야 맞는데 이유를 모르겠음...
  let radius = Math.max(lineWidth * 1.2, 8);
  if (toolType === 'eraser') {
    radius = radius * 2;
  }
  return radius;
};

export const optimizeAnimation = (cb: () => void) => {
  let animating = false;

  return () => {
    if (animating) return;

    animating = true;
    requestAnimationFrame(() => {
      cb();
      animating = false;
    });
  };
};

export class Queue<T> {
  private elements: { [key in number]: T };
  private head = 0;
  private tail = 0;

  constructor() {
    this.elements = {};
  }

  enqueue(element: T) {
    this.elements[this.tail] = element;
    ++this.tail;
  }

  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    ++this.head;
    return item;
  }

  isEmpty() {
    return this.length === 0;
  }

  get length() {
    return this.tail - this.head;
  }
}
