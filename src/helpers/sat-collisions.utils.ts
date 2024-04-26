import { Polygon } from "@octo/models";
import { intervalsOverlap, projectPolygonToAxis } from "./";

export function checkSATCollision(polygonA: Polygon, polygonB: Polygon): boolean {
    for (let z = 0; z < polygonA.normals.length; z++) {
        // Transform polygons points to space coordinates
        const polAVertices = polygonA.points.map((point) => ({ x: point.x + polygonA.position.x, y: point.y + polygonA.position.y }))
        const polBVertices = polygonB.points.map((point) => ({ x: point.x + polygonB.position.x, y: point.y + polygonB.position.y }))

        // 2. Project vertices onto the perpendiculars
        const polAProjection = projectPolygonToAxis(polAVertices, polygonA.normals[z]);
        const polBProjection = projectPolygonToAxis(polBVertices, polygonA.normals[z]);

        if (!intervalsOverlap(polAProjection, polBProjection)) {
            //  if at least one perpendicular has no overlaps, they are separated
            return false;
        }
    }
    // All normals have been checked and all projections overlap, hence the two polygons collide
    return true
}