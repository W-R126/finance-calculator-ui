import {createPortfolio} from '../../api/portfoliosAPI';

export const submitPortfolio = async (portfolioName: string) => {
    await createPortfolio(portfolioName);
};
