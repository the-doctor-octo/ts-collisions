import { Polygon } from "@octo/models";

export function registerKeyboardEvents(polygons: Polygon[], options: { currentPolygonIndex: number }): void {
    window.addEventListener('keypress', (ev) => {
        const currPolygon = polygons[options.currentPolygonIndex];
        switch (ev.key) {
            case 'q':
                options.currentPolygonIndex = options.currentPolygonIndex === polygons.length - 1 ? 0 : options.currentPolygonIndex + 1;
                break;
            case 'w':
                currPolygon.speed.y = currPolygon.speed.y <= -currPolygon.maxSpeed.y ? -currPolygon.maxSpeed.y : currPolygon.speed.y + -1;
                break;
            case 's':
                currPolygon.speed.y = currPolygon.speed.y >= currPolygon.maxSpeed.y ? currPolygon.maxSpeed.y : currPolygon.speed.y + 1;
                break;
            case 'a':
                currPolygon.speed.x = currPolygon.speed.x <= -currPolygon.maxSpeed.x ? -currPolygon.maxSpeed.x : currPolygon.speed.x + -1;
                break;
            case 'd':
                currPolygon.speed.x = currPolygon.speed.x >= currPolygon.maxSpeed.x ? currPolygon.maxSpeed.x : currPolygon.speed.x + 1;
                break;
        }
    })
    window.addEventListener('keyup', (ev) => {
        const currPolygon = polygons[options.currentPolygonIndex];
        switch (ev.key) {
            case 'w':
            case 's':
                currPolygon.speed.y = 0
                break;
            case 'a':
            case 'd':
                currPolygon.speed.x = 0;
                break;
        }
    })
}