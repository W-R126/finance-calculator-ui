export interface InvestmentParameters {
    initialDepositValue: number;
    systematicDepositValue: number;
    frequencyInYears: number;
    durationInYears: number;
    returnOfInvestment: number;
    risk: number;
}

export interface InvestmentResults {
    id: number;
    name: string;
    category: string;
    risk: number;

    graphPointsValue: {x: number; y: number}[];
    xAxisDataType: string;
    yAxisDataType: string;

    initialDepositValue: number;
    systematicDepositValue: number;
    durationInYears: number;
    frequencyInYears: number;

    returnOfInvestmentPercentage: number;
    rateOfReturnPercentage: number;
    rateOfReturnValue: number;
}
