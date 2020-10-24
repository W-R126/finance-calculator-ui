export interface DataPoint {
    x: number;
    y: number;
}

export interface DataGraph {
    graphPointsValue: DataPoint[];
    xAxisDataType: string;
    yAxisDataType: string;
}
