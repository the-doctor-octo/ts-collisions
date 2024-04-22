import { getVectorPerpendicular } from "helpers/math";
import { Polygon } from "../models/polygon";
import { Vec2d } from "../models/vec";

export function drawPolygon(polygon: Polygon, ctx: CanvasRenderingContext2D) {
  if (!polygon) {
    console.error("Polygon is null");
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
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  if (polygon.color) {
    ctx.fillStyle = polygon.color;
  }

  ctx.beginPath();
  for (let i = 1; i < polygon.points.length; i++) {
    ctx.lineTo(
      polygon.position.x + polygon.points[i].x,
      polygon.position.y + +polygon.points[i].y
    );
  }
  ctx.lineTo(origin.x, origin.y);
  ctx.closePath();
  if (polygon.fill) {
    ctx.fill();
  }
  if (polygon.outline) {
    ctx.stroke();
  }
}

export function createTriangle(height: number, color: string = "#ffb3ba") {
  return {
    color,
    fill: true,
    points: [
      { x: -height / 2, y: 0 },
      { x: height / 2, y: height / 2 },
      { x: height / 2, y: -height / 2 },
    ],
    position: {
      x: 0,
      y: 0,
    },
  } as Polygon;
}

export function createSquare(sideLength: number, color: string = "#ffb3ba") {
  return {
    color,
    fill: true,
    points: [
      { x: -sideLength / 2, y: sideLength / 2 },
      { x: sideLength / 2, y: sideLength / 2 },
      { x: sideLength / 2, y: -sideLength / 2 },
      { x: -sideLength / 2, y: -sideLength / 2 },
    ],
    position: {
      x: 0,
      y: 0,
    },
  } as Polygon;
}

export function createPolygon(
  numSides: number,
  edgeLength: number,
  color: string = "#ffb3ba"
): Polygon | null {
  if (numSides < 3) {
    console.warn("Polygon can't have only 2 sides. Minimum is 3");
    return null;
  }
  return {
    color,
    fill: true,
    outline: true,
    points: generatePolygonPoints(numSides, edgeLength),
    position: { x: 0, y: 0 },
  } as Polygon;
}

export function calculateEdgesPerpendiculars(points: Vec2d<number>[]): Vec2d<number>[] {
  const perpendiculars: Vec2d<number>[] = [];

  const numPoints = points.length;

  for (let i = 0; i < numPoints; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % numPoints]; // Next point (wraps around to the first point)

    // Calculate edge vector
    const edge: Vec2d<number> = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };

    // Calculate perpendicular axis by swapping x and y and negating one
    const perpendicularAxis = getVectorPerpendicular(edge);
    if (perpendicularAxis === null) {
      console.warn(`%c *** Cannot calculate perpendicular for edge`, `background:#222; color: #FFda55`, edge)
      continue;
    }

    // Normalize the perpendicular axis
    const length = Math.sqrt(perpendicularAxis.x * perpendicularAxis.x + perpendicularAxis.y * perpendicularAxis.y);
    perpendicularAxis.x /= length;
    perpendicularAxis.y /= length;

    perpendiculars.push(perpendicularAxis);
  }

  return perpendiculars;
}

function generatePolygonPoints(
  numSides: number,
  sideLength: number
): Vec2d<number>[] {
  const points: Vec2d<number>[] = [];
  const angleIncrement = (2 * Math.PI) / numSides;

  for (let i = 0; i < numSides; i++) {
    const angle = i * angleIncrement;
    const x = sideLength * Math.cos(angle);
    const y = sideLength * Math.sin(angle);
    points.push({ x, y });
  }

  return points;
}
