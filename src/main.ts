import './style.css';
import { Polygon } from './models/polygon';
import { Vec2d } from './models/vec';
import { drawPolygon } from './helpers/polygon-helper';

let polygons: Polygon[] = [];
const highlightColor: string = '#1Aaa0A';
const colors: string[] = [
  '#ffb3ba',
  '#ffdfba',
  '#ffffba',
  '#baffc9',
  '#bae1ff',
];

const canvasSize: Vec2d<number> = {
  x: 400,
  y: 400,
};
const canvasBgColor = '#afd7db';

const canvas = document.querySelector('canvas');

if (canvas?.getContext) {
  canvas.width = canvasSize.x;
  canvas.height = canvasSize.y;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('no context found');
  } else {
    // Canvas background
    ctx.fillStyle = canvasBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Init
    polygons = initPolygons();

    // game Cycle

    for (let i = 0; i < polygons.length; i++) {
      drawPolygon(polygons[i], ctx);
    }
  }
} else {
  console.error('Canvas not supported');
}

function initPolygons() {
  return [
    {
      color: getPolygonColor(1),
      fill: true,
      points: [
        { x: -20, y: 0 },
        { x: 20, y: 20 },
        { x: 20, y: -20 },
      ],
      position: { x: 70, y: 70 },
    },
    {
      color: getPolygonColor(2),
      fill: true,
      points: [
        { x: -20, y: 0 },
        { x: 20, y: 20 },
        { x: 20, y: -20 },
      ],
      position: { x: 30, y: 70 },
    },
    {
      color: getPolygonColor(3),
      fill: true,
      points: [
        { x: -20, y: 0 },
        { x: 20, y: 20 },
        { x: 20, y: -20 },
      ],
      position: { x: 110, y: 70 },
    },
  ];
}

function getPolygonColor(i: number) {
  const index = colors.length % (i === 0 ? 1 : i);
  return colors[index];
}
