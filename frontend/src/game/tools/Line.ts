import ShapeTool from './ShapeTool';
import type { DrawData } from '../models/DrawData';

export default class Line extends ShapeTool {
  onMouseMove(data: DrawData) {
    const {
      point: { x, y },
      color,
      width: lineWidth,
    } = data;

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
