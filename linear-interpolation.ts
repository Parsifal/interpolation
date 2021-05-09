import { InterpolationService } from "./interpolation.interface";

export class LinearInterpolationService implements InterpolationService {
  getPoint(x: number, points: number[][]) {
    return this.getFunction(points)(x);
  }

  getFunction(points: number[][]) {
    const first = points[0];
    const n = points.length - 1;
    if (points.length === 0) {
      return () => {
        return 0;
      };
    }
    if (points.length === 1) {
      return () => {
        return points[0][1];
      };
    }
    points = points.sort((a: number[], b: number[]) => {
      return a[0] - b[0];
    });
    const leftExtrapolated = (x: number) => {
      const a = points[0];
      const b = points[1];
      return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
    };
    const interpolated = (x: number, a: number[], b: number[]) => {
      return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
    };
    const rightExtrapolated = (x: number) => {
      const a = points[n - 1];
      const b = points[n];
      return b[1] + ((x - b[0]) * (b[1] - a[1])) / (b[0] - a[0]);
    };
    return (x: number) => {
      if (x <= first[0]) {
        return leftExtrapolated(x);
      }
      for (let i = 0; i < n; i++) {
        if (x > points[i][0] && x <= points[i + 1][0]) {
          return interpolated(x, points[i], points[i + 1]);
        }
      }
      return rightExtrapolated(x);
    };
  }
}
