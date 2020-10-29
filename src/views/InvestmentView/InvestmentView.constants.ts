import {InvestmentParameters} from '../../api/investments/investmentsAPI.types';
import {InvestmentCategories} from './InvestmentView.types';

export const currencyUnit = '$';

export const initialParameters: InvestmentParameters = {
    initialDepositValue: 634,
    systematicDepositValue: 119,
    frequencyInYears: 1,
    durationInYears: 30,
    returnOfInvestment: 9,
    risk: 0.14,
};

export const categories = [
    InvestmentCategories.GOLD,
    InvestmentCategories.BONDS,
    InvestmentCategories.REAL_ESTATE,
    InvestmentCategories.STOCK_MARKET,
];
