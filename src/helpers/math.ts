import { MinMax } from "@octo/models";
import { Vec2 } from "../models/vec";

export function getVectorPerpendicular(axis: Vec2<number>): Vec2<number> | null {
    if (!axis) {
        console.warn(`%c *** axis is null`, `background:#222; color: #bada55`);
        return null;
    }

    return { x: -axis.y, y: axis.x }
}

// Function to project a polygon onto a perpendicular axis
export function projectPolygonToAxis(vertices: Vec2<number>[], axis: Vec2<number>): MinMax {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    // Loop through each vertex of the polygon
    for (const vertice of vertices) {

        // Project the vertex onto the axis using the dot product
        const projection = vertice.x * axis.x + vertice.y * axis.y;

        // Update the minimum and maximum projection values
        if (projection < min) {
            min = projection;
        }
        if (projection > max) {
            max = projection;
        }
    }

    // Return the min and max projections
    return { min, max };
}


// Function to check for overlap between two projected intervals
export function intervalsOverlap(interval1: MinMax, interval2: MinMax): boolean {
    // If one interval is entirely to the left or right of the other, there is no overlap
    if (interval1.max < interval2.min || interval2.max < interval1.min) {
        return false;
    }
    // Otherwise, there is overlap
    return true;
}