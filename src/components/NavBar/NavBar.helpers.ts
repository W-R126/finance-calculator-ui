import {Routes} from '../../helpers/routes';

export function routeToText(route: string) {
    switch (route) {
        case Routes.INVESTMENT_CALCULATOR:
            return 'investment details';
        case Routes.LOGIN:
            return 'your account';
        case Routes.PORTFOLIOS:
            return 'portfolio';
        default:
            return 'you are lost';
    }
}
