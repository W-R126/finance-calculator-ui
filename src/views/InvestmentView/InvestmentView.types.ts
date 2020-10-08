export enum PeriodUnit {
    YEARS = 'years',
    MONTHS = 'months',
    WEEKS = 'weeks',
    DAYS = 'days',
}

export interface InvestmentParameters {
    initialDeposit: number;
    systematicDeposit: number;
    frequency: number;
    frequencyUnit: PeriodUnit;
    duration: number;
    durationUnit: PeriodUnit;
    ROE: number;
}
