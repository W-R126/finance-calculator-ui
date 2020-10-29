import axios from 'axios';
import {InvestmentParameters, InvestmentResults} from './investmentsAPI.types';

export function calculateInvestment(parameters: InvestmentParameters): Promise<InvestmentResults> {
    return axios({
        method: 'post',
        url: 'api/investments/calculate',
        data: parameters,
    }).then(response => response.data);
}

export function getInvestment(id: number): Promise<InvestmentResults> {
    return axios({
        method: 'get',
        url: 'api/investments',
        params: {
            id,
        },
    }).then(response => response.data);
}

export function deleteInvestment(id: number): Promise<boolean> {
    return axios({
        method: 'delete',
        url: 'api/investments',
        params: {
            id,
        },
    }).then(response => response.status === 200);
}

export function saveToPortfolio(investment: InvestmentResults, portfolioId: number) {
    return axios({
        method: 'post',
        url: 'api/investments',
        params: {
            id: portfolioId,
        },
        data: investment,
    }).then(response => response.status === 200);
}

export function modifyInvestment(investment: InvestmentResults, investmentId: number) {
    return axios({
        method: 'put',
        url: 'api/investments',
        params: {
            id: investmentId,
        },
        data: investment,
    }).then(response => response.status === 200);
}
