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
        url: 'api/portfolios',
        params: {
            id,
        },
    }).then(response => response.data);
}
