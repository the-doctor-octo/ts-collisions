import { Vec2d } from "../models/vec";

export function findPerpendicularToAxis(axis: Vec2d<number>): Vec2d<number> | null {
    if (!axis) {
        console.warn(`%c *** axis is null`, `background:#222; color: #bada55`);
        return null;
    }

    let perpendicular: Vec2d<number> = { x: 0, y: 0 };


    return perpendicular
}