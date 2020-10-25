import {Box, Button, Container, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {InvestmentParameters} from '../../api/investmentsAPI.types';
import {InvestmentChart} from '../../components/InvestmentChart/InvestmentChart';
import {DataGraph} from '../../components/InvestmentChart/InvestmentChart.types';
import {NavBar} from '../../components/NavBar/NavBar';
import {useInvestmentsAPI} from '../../hooks/useInvestmentsAPI';
import {InvestmentInfo} from './InvestmentInfo';
import {buttonBox} from './InvestmentView.styles';
import {useHistory, useLocation} from 'react-router';
import {Routes} from '../../helpers/routes';
import {modifyInvestment} from '../../api/investmentsAPI';

const initialParameters: InvestmentParameters = {
    initialDepositValue: 1800,
    systematicDepositValue: 0,
    frequencyInYears: 3,
    durationInYears: 1,
    returnOfInvestment: 20,
    risk: 0.12,
};

export const InvestmentView: React.FC = () => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const investmentId = query.get('investmentId') as number | null;

    const [parameters, setParameters] = useState<InvestmentParameters>(initialParameters);
    const {data, fetchData, isFetching} = useInvestmentsAPI(investmentId);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!isFetching) {
            fetchData({
                ...parameters,
                returnOfInvestment: parameters.returnOfInvestment / 100,
            });
        }
    });

    const handleSubmit = async () => {
        fetchData({
            ...parameters,
            returnOfInvestment: parameters.returnOfInvestment / 100,
        });
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSaveInvestment = () => {};

    const handleModifyInvestment = () => {
        if (data && investmentId) {
            modifyInvestment(data, investmentId).then(() => {
                history.push(Routes.PORTFOLIOS);
            });
        }
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
                {data && (
                    <Box display={'flex'} justifyContent={'center'}>
                        <InvestmentChart graph={(data as unknown) as DataGraph} />
                    </Box>
                )}
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

                    {investmentId === null ? (
                        <Button
                            type={'submit'}
                            disabled={isFetching}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25, marginLeft: 32}}
                            onClick={handleSaveInvestment}
                        >
                            Save to portfolio
                        </Button>
                    ) : (
                        <Button
                            type={'submit'}
                            disabled={isFetching}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25, marginLeft: 32}}
                            onClick={handleModifyInvestment}
                        >
                            Update investment
                        </Button>
                    )}
                </Box>
            </Container>
        </>
    );
};
