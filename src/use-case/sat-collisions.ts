/**
 * USE CASE: 
 * Game engine that draws polygons that move following a TBD behavior
 * and collisions between polygons is determined using the SAT(Separated Axis Theorem)
 */

import { calculateEdgesPerpendiculars, checkSATCollision, drawPolygon } from "@octo/helpers";
import { Game, Polygon, Vec2 } from "@octo/models";
import { initPolygons } from "./sat-collisions-init";
import { registerKeyboardEvents } from "./sat-collisions-inputs";

const canvasBgColor = "#afd7db"
const canvas = document.querySelector("canvas");

let polygons: Polygon[] = [];
const options = { currentPolygonIndex: 0 }

class SATCollisions extends Game {
    init(): void {
        super.init();
        polygons = initPolygons(10, 14, this.canvasHeight, { maxSpeed: { x: 5, y: 5 } });
        registerKeyboardEvents(polygons, options);
    }

    //
    update(deltaTime: number): void {
        super.update(deltaTime)

        // Clean collision status on each polygon
        for (let i = 0; i < polygons.length; i++) {
            polygons[i].colliding = false;
        }

        for (let i = 0; i < polygons.length; i++) {
            // Update geometries...
            const polygonA = polygons[i];
            if (polygonA.speed?.x !== 0) {
                polygonA.position.x += polygonA.speed.x
            }
            if (polygonA.speed?.y !== 0) {
                polygonA.position.y += polygonA.speed.y
            }
            polygonA.selected = i === options.currentPolygonIndex;

            // Check collision detection for each polygon

            //  1. Find the polygons edges and find the perpendicular axes (called normals)
            if (polygonA.normals === undefined || polygonA.normals.length === 0) {
                polygonA.normals = calculateEdgesPerpendiculars(polygonA.points)
                    .reduce((accumulation: Vec2<number>[], current: Vec2<number>) => {
                        // Remove duplicated normals (a polygon can have two edges oriented in same direction, hence same normals)
                        return accumulation.some((n) => Math.abs(n.y) === Math.abs(current.y) && Math.abs(n.x) === Math.abs(current.x)) ? accumulation : accumulation.concat(current)
                    }, []);
            }

            for (let j = i + 1; j < polygons.length; j++) {
                const polygonB = polygons[j];
                const isCollisionDetected = checkSATCollision(polygonA, polygonB);

                if (!isCollisionDetected) {
                    //  if at least one perpendicular has no overlaps, they are separated
                    polygonA.colliding = polygonA.colliding ?? false;
                    polygonB.colliding = polygonB.colliding ?? false;
                } else {
                    polygonA.colliding = true;
                    polygonB.colliding = true;
                }
            }
        }
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

const game_collisions = new SATCollisions(canvas, 400, 400, 30);
game_collisions.start(); 