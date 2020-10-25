import {InvestmentResultTypes} from '../../api/investmentsAPI.types';
import {Portfolio} from '../../api/portfoliosAPI.types';
import {createPortfolio} from '../../api/portfoliosAPI';
import {saveToPortfolio} from '../../api/investmentsAPI';

export const submitInvestment = async (
    data: InvestmentResultTypes | null,
    portfolioName: string,
    investmentCategory: string,
    investmentName: string,
    portfolios: Portfolio[],
) => {
    if (data)
        await createInvestment(await getPortfolioId(portfolioName, portfolios), {
            ...data,
            category: investmentCategory,
            name: investmentName,
        });
};

const getPortfolioId = async (portfolioName: string, portfolios: Portfolio[]): Promise<number> => {
    const result = portfolios.find(({name}) => name === portfolioName);
    if (result) return result.id;
    else return createPortfolio(portfolioName).then(result => result.id);
};

const createInvestment = (portfolioId: number, investment: InvestmentResultTypes) => saveToPortfolio(investment, portfolioId);
