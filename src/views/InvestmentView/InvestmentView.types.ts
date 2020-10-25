import {InvestmentParameters} from '../../api/investmentsAPI.types';

export interface InvestmentPostParams extends InvestmentParameters {
    category: string;
    name: string;
}
