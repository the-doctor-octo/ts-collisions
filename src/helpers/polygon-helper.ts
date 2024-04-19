import { Polygon } from '../models/polygon';
import { Vec2d } from '../models/vec';

export function drawPolygon(polygon: Polygon, ctx: CanvasRenderingContext2D) {
  if (!polygon) {
    console.error('Polygon is null');
    return;
  }
  if (polygon.points.length < 2) {
    console.warn("Too few points , can' draw polygon");
    return;
  }

  // Move to the first point, calculated as the origin summed to the first point ocordinates
  const origin: Vec2d<number> = {
    x: polygon.position.x + polygon.points[0].x,
    y: polygon.position.y + +polygon.points[0].y,
  };
  ctx.moveTo(origin.x, origin.y);

  if (polygon.color) {
    ctx.fillStyle = polygon.color;
  }

  ctx.beginPath();
  for (let i = 1; i < polygon.points.length; i++) {
    console.log(` point number : ${i}`);
    ctx.lineTo(
      polygon.position.x + polygon.points[i].x,
      polygon.position.y + +polygon.points[i].y
    );
  }
  ctx.lineTo(origin.x, origin.y);
  ctx.closePath();
  ctx.fill();
}
