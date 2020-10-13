import {PeriodUnit} from '../components/RadioPeriodSelector/RadioPeriodSelector.types';

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
