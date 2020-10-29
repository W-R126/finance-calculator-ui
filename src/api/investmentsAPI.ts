import axios from 'axios';
import {InvestmentParameters, InvestmentResultTypes} from './investmentsAPI.types';

export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    return axios({
        method: 'post',
        url: 'api/investments/calculate',
        data: {
            ...params,
            returnOfInvestment: params.returnOfInvestment / 100,
        },
    }).then(response => response.data);
}

export function getInvestment(id: number) {
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

export function saveToPortfolio(investment: InvestmentResultTypes, portfolioId: number) {
    return axios({
        method: 'post',
        url: 'api/investments',
        params: {
            id: portfolioId,
        },
        data: investment,
    }).then(response => response.status === 200);
}

export function modifyInvestment(investment: InvestmentResultTypes, investmentId: number) {
    return axios({
        method: 'put',
        url: 'api/investments',
        params: {
            id: investmentId,
        },
        data: investment,
    }).then(response => response.status === 200);
}
