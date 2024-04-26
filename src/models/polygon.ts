import { Vec2 } from "./vec";

export type Polygon = {
  position: Vec2<number>;
  points: Vec2<number>[];
  speed: Vec2<number>;
  maxSpeed: Vec2<number>;
  color: string;
  fill: boolean;
  outline: boolean;
  normals: Vec2<number>[];
  colliding?: boolean;
  selected?: boolean;
};
