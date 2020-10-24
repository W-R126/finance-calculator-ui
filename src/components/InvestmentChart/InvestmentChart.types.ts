export interface DataPoint {
    x: number;
    y: number;
}

export interface DataGraph {
    graphPointsValue: DataPoint[];
    xaxisDataType: string;
    yaxisDataType: string;
}
