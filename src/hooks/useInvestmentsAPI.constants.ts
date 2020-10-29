import {InvestmentParameters} from '../api/investmentsAPI.types';

export const defaultValues: InvestmentParameters = {
    initialDepositValue: 634,
    systematicDepositValue: 119,
    frequencyInYears: 1,
    durationInYears: 30,
    returnOfInvestment: 9,
    risk: 0.14,
};
