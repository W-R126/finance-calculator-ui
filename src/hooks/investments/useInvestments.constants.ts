import {InvestmentParameters} from '../../api/investments/investmentsAPI.types';

export const defaultParameters: InvestmentParameters = {
    initialDepositValue: 634,
    systematicDepositValue: 119,
    frequencyInYears: 1,
    durationInYears: 30,
    returnOfInvestment: 0.03,
    risk: 0.14,
};
