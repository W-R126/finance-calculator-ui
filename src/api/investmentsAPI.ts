import axios from 'axios';
import {InvestmentParameters, InvestmentResultTypes} from './investmentsAPI.types';

export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    return axios({
        method: 'post',
        url: 'api/investments/calculate',
        data: params,
    }).then(response => response.data);
}
