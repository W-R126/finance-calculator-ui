import {Portfolio} from './portfoliosAPI.types';
import axios from 'axios';

export function getPortfolios(): Promise<Portfolio[]> {
    return axios({
        method: 'get',
        url: 'api/portfolios/names',
    }).then(response => response.data);
}
