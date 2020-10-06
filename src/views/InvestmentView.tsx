import {Container} from '@material-ui/core';
import React from 'react';
import {InvestmentInfo} from '../components/InvestmentInfo/InvestmentInfo';
import {NavBar} from '../components/NavBar/NavBar';
import {RangeInput} from '../components/RangeInput/RangeInput';
import {Separator} from '../components/Separator/Separator';

interface Props {}

export const InvestmentView = (props: Props) => {
    const unit = '£';

    return (
        <React.Fragment>
            <NavBar />
            <Container maxWidth="sm">
                <Separator text="Results" />
                <InvestmentInfo
                    annualChangePercent={13}
                    annualChange={245}
                    totalChangePercent={13}
                    totalChange={245}
                    predictedChange={2500}
                />
                <Separator text="Parameters" />
                <RangeInput minValue={0} maxValue={4000} label="initial deposit" unit={unit} />
                <RangeInput minValue={0} maxValue={100} label="systematic deposit" unit={unit} />
                <RangeInput minValue={0} maxValue={4} label="frequency" label2="every" unit="years" />
                <RangeInput minValue={0} maxValue={10} label="duration" label2="for" unit="years" />
                <RangeInput minValue={0} maxValue={100} label="ROE" unit="%" />
            </Container>
        </React.Fragment>
    );
};
