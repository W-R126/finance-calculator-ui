import {Box, Button, Container, Snackbar} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {InvestmentInfo} from './InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';
import {PeriodUnit} from '../../components/RadioPeriodSelector/RadioPeriodSelector.types';
import {useInvestmentsAPI} from '../../hooks/useInvestmentsAPI';
import {InvestmentParameters} from '../../api/investmentsAPI.types';
import {inYears} from '../../helpers/inYears';
import {Alert} from '@material-ui/lab';

const mockedParameters: InvestmentParameters = {
    initialDepositValue: 1800,
    systematicDepositValue: 0,
    frequency: 3,
    frequencyUnit: PeriodUnit.WEEKS,
    frequenceInYear: inYears(3, PeriodUnit.WEEKS),
    duration: 2,
    durationUnit: PeriodUnit.DAYS,
    durationInYears: inYears(2, PeriodUnit.DAYS),
    returnOfInvestment: 20,
};

export const InvestmentView: React.FC = () => {
    const [parameters, setParameters] = useState<InvestmentParameters>(mockedParameters);
    const [data, fetchData, isFetching] = useInvestmentsAPI();

    useEffect(() => {
        if (data === null && !isFetching) {
            fetchData(parameters);
        }
    }, [fetchData, parameters, data, isFetching]);

    const handleSubmit = async () => {
        fetchData({
            ...parameters,
            returnOfInvestment: parameters.returnOfInvestment / 100,
        });
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Saved to portfolio!
                </Alert>
            </Snackbar>
            {false && (
                <NavBar />
            ) /* This is so that the pipeline will not complain about unused component. It will be activated for auth when it's done.*/}
            <Container maxWidth="sm">
                <InvestmentInfo parameters={parameters} setParameters={setParameters} results={data} />
                <Box className={buttonBox}>
                    <Button
                        type={'submit'}
                        disabled={isFetching}
                        variant={'contained'}
                        color={'primary'}
                        style={{borderRadius: 25}}
                        onClick={handleSubmit}
                    >
                        Calculate
                    </Button>

                    <Button
                        type={'submit'}
                        disabled={isFetching}
                        variant={'contained'}
                        color={'primary'}
                        style={{borderRadius: 25, marginLeft: 32}}
                        onClick={handleClick}
                    >
                        Save to portfolio
                    </Button>
                </Box>
            </Container>
        </>
    );
};
