import {PeriodUnit} from '../components/RadioPeriodSelector/RadioPeriodSelector.types';

export interface InvestmentParameters {
    initialDepositValue: number;
    systematicDepositValue: number;
    frequency: number;
    frequencyUnit: PeriodUnit;
    frequenceInYear: number;
    duration: number;
    durationUnit: PeriodUnit;
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
    // initialDepositValue + systematicDepositValue * (durationInYears / frequenceInYear) + rateOfReturnValue;
}
