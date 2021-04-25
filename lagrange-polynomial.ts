import { InterpolationService } from "interpolation.interface";

export class LagrangePolynomialService implements InterpolationService {
  getPoint(x: number, points: number[][]) {
    return this.getFunction(points)(x);
  }

  getFunction(points: number[][]) {
    const n = points.length - 1;
    const f = (i: number, j: number, x: number): number => {
      if (i === j) return points[i][1];
      return ((points[j][0] - x) * f(i, j - 1, x) + (x - points[i][0]) * f(i + 1, j, x)) / (points[j][0] - points[i][0]);
    };
    return (x: number) => {
      if (points.length === 0) return 0;
      return f(0, n, x);
    };
  }
}
