import axios from 'axios';
import {InvestmentParameters, InvestmentResultTypes} from './investmentsAPI.types';

export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    console.log(JSON.stringify(params));
    return axios({
        method: 'post',
        url: '/investments/calculate',
        data: params,
    }).then(response => response.data);
}
