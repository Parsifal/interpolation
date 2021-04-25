export interface InterpolationService {
  getPoint(x: number, points: number[][]): number;
  getFunction(points: number[][]): (x: number) => number;
}
