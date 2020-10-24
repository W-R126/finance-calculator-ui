export interface InvestmentParameters {
    initialDepositValue: number;
    systematicDepositValue: number;
    frequenceInYear: number;
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
    frequenceInYear: number;
    graphPointsValue: GraphPoint[];
    xaxisDataType: string;
    yaxisDataType: string;
    totalRiskPercentage: number;
}
