import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {InvestmentView} from './views/InvestmentView';

export const App = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <InvestmentView />
        </React.Fragment>
    );
};
