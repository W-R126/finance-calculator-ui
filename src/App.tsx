import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {getBaseName} from './App.helpers';
import {Routes} from './helpers/routes';
import {InvestmentView} from './views/InvestmentView';
import {LoginView} from './views/LoginView/LoginView';
import {AuthContextProvider} from './contexts/authContext';
import {PortfolioView} from './views/PortfolioView';
import {NavBar} from './components/NavBar/NavBar';

export const App = () => {
    const basename = getBaseName();

    return (
        <AuthContextProvider>
            <BrowserRouter basename={basename}>
                <CssBaseline />
                <NavBar />
                <Switch>
                    <Route path={'/'} exact>
                        <Redirect to={Routes.INVESTMENT_CALCULATOR} />
                    </Route>
                    <Route path={Routes.INVESTMENT_CALCULATOR}>
                        <InvestmentView />
                    </Route>
                    <Route path={Routes.PORTFOLIOS}>
                        <PortfolioView />
                    </Route>
                    <Route path={Routes.LOGIN}>
                        <LoginView />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    );
};
