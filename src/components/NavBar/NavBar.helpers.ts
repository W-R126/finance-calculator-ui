import {Routes} from '../../helpers/routes';

export const routeToText = (route: string) => {
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
};

export const getGoBackRoute = (isAuth: boolean, inInvestment: boolean) => {
    if (isAuth) return Routes.PORTFOLIOS;
    if (inInvestment) return Routes.LOGIN;
    else return Routes.INVESTMENT_CALCULATOR;
};
