import {Box, Container, styled, Typography} from '@material-ui/core';
import React from 'react';
import {InvestmentInfo} from '../components/InvestmentInfo/InvestmentInfo';
import {NavBar} from '../components/NavBar/NavBar';
import {RangeInput} from '../components/RangeInput/RangeInput';

interface Props {}

export const InvestmentView = (props: Props) => {
    return (
        <React.Fragment>
            <NavBar />
            <Container maxWidth="sm">
                <Header />
                <InvestmentInfo
                    annualChangePercent={13}
                    annualChange={245}
                    totalChangePercent={13}
                    totalChange={245}
                    predictedChange={2500}
                />
                <RangeInput minValue={0} maxValue={100} label="Range Input Component" unit="£" />
            </Container>
        </React.Fragment>
    );
};

const CenterBox = styled(Box)({
    textAlign: 'center',
    color: '#3461ff',
    padding: '1rem',
});

const Header = () => (
    <CenterBox>
        <Typography variant="h5">Results</Typography>
    </CenterBox>
);
