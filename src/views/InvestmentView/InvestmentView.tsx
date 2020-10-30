import {
    Box,
    Button,
    Container,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    CircularProgress,
    Backdrop,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {FreeSoloAutocomplete} from '../../components/FreeSoloAutocomplete/FreeSoloAutocomplete';
import {InvestmentChart} from '../../components/InvestmentChart/InvestmentChart';
import {DataGraph} from '../../components/InvestmentChart/InvestmentChart.types';
import {buttonBox} from './InvestmentView.styles';
import {useHistory} from 'react-router';
import {Routes} from '../../helpers/routes';
import {modifyInvestment} from '../../api/investments/investmentsAPI';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {calculatePredictedChange, submitInvestment} from './InvestmentView.helpers';
import {categories, currencyUnit} from './InvestmentView.constants';
import {useInvestments} from '../../hooks/investments/useInvestments';
import {Separator} from '../../components/Separator/Separator';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {RangeInput} from '../../components/RangeInput/RangeInput';
import {FrequencySelector} from '../../components/FrequencySelector/FrequencySelector';
import {InvestmentParameters} from '../../api/investments/investmentsAPI.types';
import {useUserState} from '../../contexts/authContext';

export const InvestmentView: React.FC = () => {
    const history = useHistory();
    const {isFetching, results, recalculate, setParameters, parameters, investmentId} = useInvestments();

    const currency = currencyUnit;

    const [handler, setHandler] = useState<number | null>(null);
    const updateParameters = (params: InvestmentParameters) => {
        setParameters(params);
        if (handler !== null) {
            clearTimeout(handler);
        }

        setHandler(
            (setTimeout(() => {
                recalculate(params);
            }, 2000) as unknown) as number,
        );
    };

    const setInitialDeposit = (initialDepositValue: number) => {
        updateParameters({
            ...parameters,
            initialDepositValue,
        });
    };

    const setSystematicDeposit = (systematicDepositValue: number) => {
        updateParameters({
            ...parameters,
            systematicDepositValue,
        });
    };

    const setFrequency = (frequencyInYears: number) => {
        updateParameters({
            ...parameters,
            frequencyInYears,
        });
    };

    const setDuration = (durationInYears: number) => {
        updateParameters({
            ...parameters,
            durationInYears,
        });
    };

    const setReturnOfInvestment = (returnOfInvestment: number) => {
        updateParameters({
            ...parameters,
            returnOfInvestment,
        });
    };

    const setRisk = (risk: number) => {
        updateParameters({
            ...parameters,
            risk,
        });
    };

    const onRiskChange = (value: number) => setRisk(value / 100);
    const onROIChange = (value: number) => {
        setReturnOfInvestment(value / 100);
    };
    // DIALOG
    const [dialogOpen, setDialogOpen] = useState(false);

    const [portfoliosNames, setPortfoliosNames] = useState<string[]>([]);
    const [portfolioName, setPortfolioName] = useState('');

    const [investmentCategory, setInvestmentCategory] = useState(results?.category ?? '');
    const [investmentName, setInvestmentName] = useState(results?.name ?? '');

    useEffect(() => {
        setInvestmentCategory(results?.category ?? '');
        setInvestmentName(results?.name ?? '');
    }, [results]);

    const {portfolios} = usePortfoliosAPI(null);

    useEffect(() => {
        if (portfolios) setPortfoliosNames(portfolios.map(({name}) => name));
    }, [portfolios]);

    const isAuth = useUserState().isAuth;
    const openDialog = () => {
        if (!isAuth) {
            history.push(Routes.LOGIN);
        }
        setDialogOpen(true);
    };

    const handleDialogClose = () => setDialogOpen(false);

    const handleDialogAdd = () => {
        submitInvestment(results, portfolioName, investmentCategory, investmentName, portfolios, parameters).then(portfolioId => {
            // setDialogOpen(false);
            history.push(`${Routes.PORTFOLIOS}?portfolioId=${portfolioId}`);
        });
    };

    const handleDialogUpdate = () => {
        if (results && investmentId) {
            modifyInvestment({...results, category: investmentCategory, name: investmentName}, investmentId).then(() => {
                history.push(Routes.PORTFOLIOS);
            });
        }
    };

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Save Investment</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please provide some details about investment</DialogContentText>
                    {investmentId === null && (
                        <FreeSoloAutocomplete
                            label="Portfolio name"
                            items={portfoliosNames}
                            initialValue={portfolioName}
                            onChange={setPortfolioName}
                        />
                    )}
                    <TextField
                        label="Investment name"
                        type="text"
                        fullWidth
                        value={investmentName}
                        variant="outlined"
                        onChange={event => setInvestmentName(event.target.value)}
                    />
                    <FreeSoloAutocomplete
                        label="Investment category"
                        items={categories}
                        initialValue={investmentCategory}
                        onChange={setInvestmentCategory}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    {investmentId !== null ? (
                        <Button onClick={handleDialogUpdate} type={'submit'} color="primary">
                            Update
                        </Button>
                    ) : (
                        <Button onClick={handleDialogAdd} type={'submit'} color="primary">
                            Add
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Container maxWidth="sm">
                {results ? (
                    <>
                        <Box display={'flex'} justifyContent={'center'}>
                            <InvestmentChart graph={(results as unknown) as DataGraph} />
                        </Box>
                        <Separator text="Results" />
                        <InvestmentResults
                            totalChangePercent={results.rateOfReturnPercentage}
                            totalChange={results.rateOfReturnValue}
                            totalRiskPercentage={parameters.risk}
                            predictedChange={calculatePredictedChange(
                                results.initialDepositValue,
                                results.systematicDepositValue,
                                results.durationInYears,
                                results.frequencyInYears,
                                results.rateOfReturnValue,
                            )}
                        />
                    </>
                ) : (
                    <Box textAlign="center" height="137px">
                        <Separator text="Results" />
                        <CircularProgress />
                    </Box>
                )}
                <Separator text="Parameters" />
                <RangeInput
                    minValue={1}
                    maxValue={5000}
                    label="initial deposit"
                    unit={currency}
                    value={parameters.initialDepositValue}
                    onChange={setInitialDeposit}
                />
                <RangeInput
                    minValue={0}
                    maxValue={250}
                    label="systematic deposit"
                    unit={currency}
                    value={parameters.systematicDepositValue}
                    onChange={setSystematicDeposit}
                />
                <FrequencySelector value={parameters.frequencyInYears} onChange={setFrequency} label="frequency" />
                <FrequencySelector value={parameters.durationInYears} onChange={setDuration} label="duration" />
                <RangeInput
                    minValue={0}
                    maxValue={50}
                    label="ROI"
                    unit="%"
                    value={Math.round(parameters.returnOfInvestment * 100)}
                    onChange={onROIChange}
                />
                <RangeInput
                    minValue={0}
                    maxValue={100}
                    label="Risk factor"
                    unit="%"
                    value={Math.round(parameters.risk * 100)}
                    onChange={onRiskChange}
                />

                <Box className={buttonBox}>
                    <Button
                        type={'submit'}
                        disabled={isFetching}
                        variant={'contained'}
                        color={'primary'}
                        style={{borderRadius: 25, marginLeft: 32}}
                        onClick={openDialog}
                    >
                        {investmentId !== null ? 'Update investment' : 'Save to portfolio'}
                    </Button>
                </Box>
                <Backdrop open={isFetching} style={{zIndex: 999, color: '#fff'}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </>
    );
};
