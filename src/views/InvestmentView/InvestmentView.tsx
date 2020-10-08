import {Box, Button, Container, duration} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentInfo} from './InvestmentInfo/InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';
import {InvestmentParameters, PeriodUnit} from './InvestmentView.types';

export const CurrencyContext = React.createContext('$');

const mockedParameters: InvestmentParameters = {
    initialDeposit: 1800,
    systematicDeposit: 40,
    frequency: 3,
    frequencyUnit: PeriodUnit.WEEKS,
    duration: 2,
    durationUnit: PeriodUnit.DAYS,
    ROE: 20,
};

interface Props {}

export const InvestmentView = (props: Props) => {
    const [submitting, setSubmitting] = useState(false);
    const [parameters, setParameters] = useState<InvestmentParameters>(mockedParameters);
    const onSubmit = () => {
        console.log(parameters);
    };

    return (
        <React.Fragment>
            <CurrencyContext.Provider value={'$'}>
                <NavBar />
                <Container maxWidth="sm">
                    <InvestmentInfo parameters={parameters} setParameters={setParameters} />
                    <Box className={buttonBox}>
                        <Button
                            type={'submit'}
                            disabled={submitting}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25}}
                            onClick={onSubmit}
                        >
                            SAVE TO PORTFOLIO
                        </Button>
                    </Box>
                </Container>
            </CurrencyContext.Provider>
        </React.Fragment>
    );
};
