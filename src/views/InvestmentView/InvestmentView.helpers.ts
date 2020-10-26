import {InvestmentParameters, InvestmentResultTypes} from '../../api/investmentsAPI.types';
import {Portfolio} from '../../api/portfoliosAPI.types';
import {createPortfolio} from '../../api/portfoliosAPI';
import {saveToPortfolio} from '../../api/investmentsAPI';

export const submitInvestment = async (
    data: InvestmentResultTypes | null,
    portfolioName: string,
    investmentCategory: string,
    investmentName: string,
    portfolios: Portfolio[],
    parameters: InvestmentParameters,
) => {
    const portfolioId = await getPortfolioId(portfolioName, portfolios);
    if (data)
        await createInvestment(portfolioId, {
            ...parameters,
            category: investmentCategory,
            name: investmentName,
            rateOfReturnPercentage: data.rateOfReturnPercentage,
            rateOfReturnValue: data.rateOfReturnValue,
            graphPointsValue: data.graphPointsValue,
            xAxisDataType: data.xAxisDataType,
            yAxisDataType: data.yAxisDataType,
            id: data.id,
        });
    return portfolioId;
};

const getPortfolioId = async (portfolioName: string, portfolios: Portfolio[]): Promise<number> => {
    const result = portfolios.find(({name}) => name === portfolioName);
    if (result) return result.id;
    else return createPortfolio(portfolioName).then(result => result.id);
};

const createInvestment = (portfolioId: number, investment: InvestmentResultTypes) => saveToPortfolio(investment, portfolioId);
