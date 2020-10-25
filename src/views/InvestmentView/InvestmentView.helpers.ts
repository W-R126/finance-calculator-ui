import {InvestmentParameters} from '../../api/investmentsAPI.types';
import {InvestmentPostParams} from './InvestmentView.types';

export const submitInvestment = (
    parameters: InvestmentParameters,
    portfolioName: string,
    investmentCategory: string,
    investmentName: string,
    portfoliosNames: string[],
) => {
    createInvestment(createPortfolio(portfolioName), {...parameters, category: investmentCategory, name: investmentName});
};

const createPortfolio = (portfolioName: string): number => {
    return 0;
}; //TODO create portfolio if not exists and return its id

const createInvestment = (portfolioId: number, investmentParams: InvestmentPostParams) => {
    //TODO create investment and redirect
};
