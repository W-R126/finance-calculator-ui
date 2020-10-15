import {Box, Button, CircularProgress, Container} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {InvestmentInfo} from './InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';
import {PeriodUnit} from '../../components/RadioPeriodSelector/RadioPeriodSelector.types';
import {useInvestmentsAPI} from '../../hooks/useInvestmentsAPI';
import {Separator} from '../../components/Separator/Separator';
import {InvestmentParameters} from '../../api/investmentsAPI.types';
import {inYears} from '../../helpers/inYears';

const mockedParameters: InvestmentParameters = {
    initialDepositValue: 1800,
    systematicDepositValue: 40,
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

    return (
        <>
            {false && <NavBar /> /* This is so that the pipeline will not complain about unused component. It will be activated for auth */}
            when it's done.
            <Container maxWidth="sm">
                {isFetching && (
                    <Box textAlign="center">
                        <Separator text="Results" />
                        <CircularProgress />
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
                        SUBMIT
                    </Button>
                </Box>
            </Container>
        </>
    );
};
