export interface InvestmentParameters {
    initialDepositValue: number;
    systematicDepositValue: number;
    frequencyInYears: number;
    durationInYears: number;
    returnOfInvestment: number;
}

export interface GraphPoint {
    x: number;
    y: number;
}

export interface InvestmentResultTypes {
    rateOfReturnPercentage: number;
    rateOfReturnValue: number;
    initialDepositValue: number;
    systematicDepositValue: number;
    durationInYears: number;
    frequencyInYears: number;
    graphPointsValue: GraphPoint[];
    xAxisDataType: string;
    yAxisDataType: string;
    risk: number;
}
