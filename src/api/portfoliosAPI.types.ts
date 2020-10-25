import {GraphPoint} from './investmentsAPI.types';

export interface Portfolio {
    id: number;
    name: string;
}

export interface PortfolioInvestment {
    category: string;
    graphPointsValue: GraphPoint[];
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
    graphPointsValue: GraphPoint[];
    investments: PortfolioInvestment[];
    rateOfReturnPercentage: number;
    rateOfReturnValue: number;
    totalInvestedCash: number;
}
