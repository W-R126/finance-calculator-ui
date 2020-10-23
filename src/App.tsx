import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {PortfolioView} from './views/PortfolioView';

export const App = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <PortfolioView />
        </React.Fragment>
    );
};
