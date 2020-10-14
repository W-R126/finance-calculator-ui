import axios from 'axios';
import {InvestmentParameters, InvestmentResultTypes} from './investmentsAPI.types';

export function getInvestmentCalculation(params: InvestmentParameters): Promise<InvestmentResultTypes> {
    console.log(JSON.stringify(params));
    return axios({
        method: 'get',
        url: 'https://fin-calc-service.metis-team.sit.fintechchallenge.pl/investments/calculate',
        data: params,
    }).then(response => response.data);
}
