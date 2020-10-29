import {Portfolio} from '../../api/portfoliosAPI.types';
import {createPortfolio} from '../../api/portfoliosAPI';
import {saveToPortfolio} from '../../api/investments/investmentsAPI';
import {InvestmentParameters, InvestmentResults} from '../../api/investments/investmentsAPI.types';

export const submitInvestment = async (
    data: InvestmentResults | null,
    portfolioName: string,
    investmentCategory: string,
    investmentName: string,
    portfolios: Portfolio[],
    parameters: InvestmentParameters,
) => {
    const portfolioId = await getPortfolioId(portfolioName, portfolios);
    if (data)
        await createInvestment(portfolioId, {
            ...data,
            category: investmentCategory,
            name: investmentName,
        });
    return portfolioId;
};

const getPortfolioId = async (portfolioName: string, portfolios: Portfolio[]): Promise<number> => {
    const result = portfolios.find(({name}) => name === portfolioName);
    if (result) return result.id;
    else return createPortfolio(portfolioName).then(result => result.id);
};

const createInvestment = (portfolioId: number, investment: InvestmentResults) => saveToPortfolio(investment, portfolioId);

export const calculatePredictedChange = (
    initialDepositValue: number,
    systematicDepositValue: number,
    durationInYears: number,
    frequenceInYear: number,
    rateOfReturnValue: number,
) => initialDepositValue + systematicDepositValue * (durationInYears / frequenceInYear) + rateOfReturnValue;
