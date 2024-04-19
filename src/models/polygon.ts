import { Vec2d } from './vec';

export type Polygon = {
  position: Vec2d<number>;
  points: Vec2d<number>[];
  color: string;
  fill: boolean;
};
