import {DataPoint} from './InvestmentChart.types';

export const roundAllPoints = (points: DataPoint[]) => points.map(point => roundPoint(point));
const roundPoint = (point: DataPoint) =>
    ({
        x: roundToTwoDecimalPlaces(point.x),
        y: roundToTwoDecimalPlaces(point.y),
    } as DataPoint);
const roundToTwoDecimalPlaces = (num: number) => Math.round(num * 100) / 100;
