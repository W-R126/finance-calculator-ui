import {Portfolio, PortfolioDetails} from './portfoliosAPI.types';
import axios from 'axios';

export function getPortfolios(): Promise<Portfolio[]> {
    return axios({
        method: 'get',
        url: 'api/portfolios/names',
    }).then(response => response.data);
}

export function getPortfolioDetails(id: number): Promise<PortfolioDetails> {
    return axios({
        method: 'get',
        url: id !== 0 ? 'api/portfolios' : 'api/portfolios/all-investments-details',
        params: {
            id,
        },
    }).then(response => response.data);
}

export function deletePortfolio(id: number): Promise<boolean> {
    return axios({
        method: 'delete',
        url: 'api/portfolios',
        params: {
            id,
        },
    }).then(response => response.status === 200);
}

export function createPortfolio(name: string) {
    return axios({
        method: 'post',
        url: 'api/portfolios',
        params: {
            name,
        },
    }).then(response => response.data);
}
