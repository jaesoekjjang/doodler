import Point from '../models/Point';
import Tool from '../models/Tool';
import type { ToolData } from '../models/ToolData';

export default class ShapeTool extends Tool {
  protected startPoint: Point;
  protected image: ImageData;

  constructor(protected readonly canvas: HTMLCanvasElement) {
    super(canvas.getContext('2d')!);
  }

  onMouseDown(data: ToolData) {
    this.startPoint = data.point;
    this.image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  onMouseMove(data: ToolData) {}
}
