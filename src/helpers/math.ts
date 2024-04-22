import { Vec2d } from "../models/vec";

export function getVectorPerpendicular(axis: Vec2d<number>): Vec2d<number> | null {
    if (!axis) {
        console.warn(`%c *** axis is null`, `background:#222; color: #bada55`);
        return null;
    }

    return { x: -axis.y, y: axis.x }
}

export function getVectorNormal(vector: Vec2d<number>): Vec2d<number> | null {
    if (!vector) {
        console.warn(`%c *** axis is null`, `background:#222; color: #bada55`);
        return null;
    }

    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    return { x: vector.x /= length, y: vector.y /= length }
}