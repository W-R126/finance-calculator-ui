export interface InvestmentParameters {
    initialDepositValue: number;
    systematicDepositValue: number;
    frequenceInYear: number;
    durationInYears: number;
    returnOfInvestment: number;
}

export interface InvestmentResultTypes {
    rateOfReturnPercentage: number;
    rateOfReturnValue: number;
    initialDepositValue: number;
    systematicDepositValue: number;
    durationInYears: number;
    frequenceInYear: number;
    totalRiskPercentage: number;
}
