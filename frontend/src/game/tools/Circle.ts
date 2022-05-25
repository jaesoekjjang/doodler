import Point from '../models/Point';
import ShapeTool from './ShapeTool';

interface drawData {
  point: Point;
  width: number;
  color: string;
}

export default class Ellipse extends ShapeTool {
  onMouseMove(data: drawData) {
    const {
      point: { x, y },
      color,
      width: lineWidth,
    } = data;
    const { x: startX, y: startY } = this.startPoint;

    const width = Math.abs(x - startX);
    const height = Math.abs(y - startY);

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(startX, startY, width / 2, height / 2, 0, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}
