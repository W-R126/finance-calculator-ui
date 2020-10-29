export interface Portfolio {
    id: number;
    name: string;
}

export interface PortfolioInvestment {
    category: string;
    graphPointsValue: {x: number; y: number}[];
    id: number;
    name: string;
    rateOfReturnPercentage: number;
    risk: number;
    xAxisDataType: string;
    yAxisDataType: string;
}

export interface PortfolioDetails {
    id: number;
    name: string;
    graphPointsValue: {x: number; y: number}[];
    investments: PortfolioInvestment[];
    rateOfReturnPercentage: number;
    rateOfReturnValue: number;
    totalInvestedCash: number;
    risk: number;
}
