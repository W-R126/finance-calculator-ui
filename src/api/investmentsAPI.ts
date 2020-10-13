import {PeriodUnit} from './../components/RadioPeriodSelector/RadioPeriodSelector.types';

export interface InvestmentParameters {
    initialDeposit: number;
    systematicDeposit: number;
    frequency: number;
    frequencyUnit: PeriodUnit;
    duration: number;
    durationUnit: PeriodUnit;
    ROE: number;
}

export interface InvestmentResultTypes {
    annualChangePercent: number;
    annualChange: number;
    totalChangePercent: number;
    totalChange: number;
    predictedChange: number;
}

function withDelay<T>(delay: number, value: T): Promise<T> {
    return new Promise<T>(resolve => setTimeout(() => resolve(value), delay));
}

// api/investments/calculate
export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    return withDelay(1000, {
        annualChangePercent: 12,
        annualChange: 256,
        totalChangePercent: 12,
        totalChange: 256,
        predictedChange: 2400,
    } as InvestmentResultTypes);
}
