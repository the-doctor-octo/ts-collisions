import { createPolygon } from "@octo-ts/helpers";
import { Polygon } from "@octo-ts/models";


export const highlightColor: string = "#1Aaa0A";
export const colors: string[] = [
    "#ffb3ba",
    "#ffdfba",
    "#ffffba",
    "#baffc9",
    "#bae1ff",
];

export function initPolygons(edgeLength: number, canvasHeight: number) {
    const polygons: Polygon[] = [];
    for (let i = 0; i < 10; i++) {
        const polygon = createPolygon(i + 3, edgeLength, getPolygonColor(i));
        if (!polygon) continue;
        polygon.position = { x: 15 + i * 40, y: canvasHeight / 2 };
        polygons.push(polygon);
    }

    return polygons;
}

function getPolygonColor(i: number): string {
    return colors[i % colors.length];
}