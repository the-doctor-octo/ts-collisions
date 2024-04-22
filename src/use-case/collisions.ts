/**
 * USE CASE: 
 * Game engine that draws polygons that move following a TBD behavior
 * and collisions between polygons is determined using the SAT(Separated Axis Theorem)
 */

import { drawPolygon } from "@octo-ts/helpers";
import { Game, Polygon } from "@octo-ts/models";
import { initPolygons } from "use-case/collisions-init";

const canvasBgColor = "#afd7db"
const canvas = document.querySelector("canvas");

let polygons: Polygon[] = [];

class Collisions extends Game {
    init(): void {
        super.init();

        polygons = initPolygons(12, this.canvasHeight);
    }

    update(deltaTime: number): void {
        super.update(deltaTime)

        // For each couple of polygons


        //  1. Find the polygons axes and find the axes perpendiculars

        //      3. Project vertices onto the perpendiculars
        //      If overlap, check next perpendicular, else stop
        //  if at least one perpendicular has no overlaps, they are separated
    }

    render(): void {
        super.render();
        // Apply background color
        this.ctx!.fillStyle = canvasBgColor;
        this.ctx!.fillRect(0, 0, this.canvas!.width, this.canvas!.height)

        // Polygons
        for (let i = 0; i < polygons.length; i++) {
            drawPolygon(polygons[i], this.ctx!);
        }
    }
}


const game_collisions = new Collisions(canvas, 400, 400, 30);
game_collisions.start();