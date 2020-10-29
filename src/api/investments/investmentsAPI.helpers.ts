import {InvestmentParameters, InvestmentResults} from './investmentsAPI.types';

export function convertResultsToParameters(results: InvestmentResults): InvestmentParameters {
    return {
        ...results,
        returnOfInvestment: results.rateOfReturnPercentage,
    };
}
