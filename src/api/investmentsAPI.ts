import axios from 'axios';
import {InvestmentParameters, InvestmentResultTypes} from './investmentsAPI.types';

export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    return axios({
        method: 'post',
        url: 'api/investments/calculate',
        data: params,
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
