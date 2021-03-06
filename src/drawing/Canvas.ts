import Bucket from './tools/Bucket';
import Ellipse from './tools/Ellipse';
import Eraser from './tools/Eraser';
import Line from './tools/Line';
import Pencil from './tools/Pencil';
import Rectangle from './tools/Rectangle';

import type { ToolTypes } from './models/TooTypes';
import type Point from './models/Point';
import type Tool from './models/Tool';

import { optimizeAnimation } from '../utils';
import { ToolData } from './models/ToolData';

export default class Canvas {
  private containerRef: React.RefObject<HTMLElement>;
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _ogPoint: Point = { x: 0, y: 0 };

  private pencil: Pencil;
  private eraser: Eraser;
  private rectangle: Rectangle;
  private ellipse: Ellipse;
  private line: Line;
  private bucket: Bucket;
  private _tool: Tool;

  private history: ImageData[] = [];
  private historyPointer = -1;

  constructor(containerRef: React.RefObject<HTMLElement>) {
    this.canvas = document.createElement('canvas');
    containerRef.current?.appendChild(this.canvas);
    this.containerRef = containerRef;
    this._ctx = this.canvas.getContext('2d')!;
    window.addEventListener('resize', optimizeAnimation(this.reSize.bind(this)));

    this.setSize();
    this.pencil = new Pencil(this._ctx);
    this.eraser = new Eraser(this._ctx);
    this.rectangle = new Rectangle(this.canvas);
    this.ellipse = new Ellipse(this.canvas);
    this.line = new Line(this.canvas);
    this.bucket = new Bucket(this.canvas);
    this._tool = this.pencil;

    this.initSetting();
  }

  private initSetting() {
    this.setOgPoint();
    this._ctx.lineJoin = 'round';
    this._ctx.lineCap = 'round';
    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this._ctx.translate(0.5, 0.5);
    this.storeImage();
  }

  reSize() {
    const tempImg = this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.initSetting();
    this._ctx.putImageData(tempImg, 0, 0);
  }

  setSize() {
    this.canvas.width = this.containerRef.current?.offsetWidth!;
    this.canvas.height = this.containerRef.current?.offsetHeight!;
  }

  setOgPoint() {
    this._ogPoint = {
      x: this.containerRef.current?.offsetLeft!,
      y: this.containerRef.current?.offsetTop!,
    };
  }

  relativePoint(p: Point): Point {
    const x = p.x - this._ogPoint.x;
    const y = p.y - this._ogPoint.y;
    return { x, y };
  }

  onMouseDown(data: ToolData) {
    const point = this.relativePoint(data.point);
    this._tool.onMouseDown({ ...data, point });
  }

  onMouseMove(data: ToolData) {
    const point = this.relativePoint(data.point);
    this._tool.onMouseMove({ ...data, point });
  }

  clear() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this._ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.storeImage();
  }

  storeImage() {
    this.history.splice(this.historyPointer + 1);
    this.history.push(this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    this.historyPointer++;
    if (this.history.length <= 20) return;

    this.history.shift();
    this.historyPointer--;
  }

  undo() {
    if (this.historyPointer <= 0) return;
    this._ctx.putImageData(this.history[--this.historyPointer], 0, 0);
  }

  redo() {
    if (this.historyPointer >= this.history.length - 1 || this.historyPointer <= -1) return;
    this._ctx.putImageData(this.history[++this.historyPointer], 0, 0);
  }

  get element() {
    return this.canvas;
  }

  get ctx() {
    return this._ctx;
  }

  get ogPoint() {
    return this._ogPoint;
  }

  get image() {
    return this.history[this.historyPointer];
  }

  set tool(tool: ToolTypes) {
    if (tool === 'pencil') this._tool = this.pencil;
    if (tool === 'eraser') this._tool = this.eraser;
    if (tool === 'rectangle') this._tool = this.rectangle;
    if (tool === 'ellipse') this._tool = this.ellipse;
    if (tool === 'line') this._tool = this.line;
    if (tool === 'bucket') this._tool = this.bucket;
  }
}
