import {createPortfolio} from '../../api/portfoliosAPI';

export const submitPortfolio = async (portfolioName: string) => {
    return await createPortfolio(portfolioName).then(result => result.id);
};
