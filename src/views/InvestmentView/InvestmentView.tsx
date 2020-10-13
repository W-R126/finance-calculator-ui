import {Box, Button, CircularProgress, Container} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentInfo} from './InvestmentInfo/InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';
import {PeriodUnit} from '../../components/RadioPeriodSelector/RadioPeriodSelector.types';
import {InvestmentParameters} from '../../api/investmentsAPI';
import {useInvestmentsAPI} from '../../hooks/useInvestmentsAPI';
import {Separator} from '../../components/Separator/Separator';

const mockedParameters: InvestmentParameters = {
    initialDeposit: 1800,
    systematicDeposit: 40,
    frequency: 3,
    frequencyUnit: PeriodUnit.WEEKS,
    duration: 2,
    durationUnit: PeriodUnit.DAYS,
    ROE: 20,
};

export const InvestmentView: React.FC = () => {
    const [parameters, setParameters] = useState<InvestmentParameters>(mockedParameters);
    const [data, fetchData, isFetching] = useInvestmentsAPI();

    const handleSubmit = async () => {
        fetchData(parameters);
    };

    return (
        <>
            <NavBar />
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
                        SAVE TO PORTFOLIO
                    </Button>
                </Box>
            </Container>
        </>
    );
};
