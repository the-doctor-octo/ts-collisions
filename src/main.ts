import { createPolygon, drawPolygon } from "./helpers/polygon-helper";
import { Polygon } from "./models/polygon";
import { Vec2d } from "./models/vec";
import "./style.css";

let polygons: Polygon[] = [];
const highlightColor: string = "#1Aaa0A";
const colors: string[] = [
  "#ffb3ba",
  "#ffdfba",
  "#ffffba",
  "#baffc9",
  "#bae1ff",
];

const canvasSize: Vec2d<number> = {
  x: 400,
  y: 400,
};
const canvasBgColor = "#afd7db";

const canvas = document.querySelector("canvas");

if (canvas?.getContext) {
  canvas.width = canvasSize.x;
  canvas.height = canvasSize.y;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("no context found");
  } else {
    // Canvas background
    ctx.fillStyle = canvasBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Init
    polygons = initPolygons(12);

    // game Cycle (update, render)
    for (let i = 0; i < polygons.length; i++) {
      drawPolygon(polygons[i], ctx);
    }
  }
} else {
  console.error("Canvas not supported");
}

function initPolygons(edgeLength: number) {
  const polygons: Polygon[] = [];
  for (let i = 0; i < 10; i++) {
    const polygon = createPolygon(i + 3, edgeLength, getPolygonColor(i));
    if (!polygon) continue;
    polygon.position = { x: 15 + i * 40, y: canvasSize.y / 2 };
    polygons.push(polygon);
  }

  return polygons;
}

function getPolygonColor(i: number): string {
  return colors[i % colors.length];
}
