import {
    Box,
    Button,
    Container,
    DialogActions,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {InvestmentParameters} from '../../api/investmentsAPI.types';
import {FreeSoloAutocomplete} from '../../components/FreeSoloAutocomplete/FreeSoloAutocomplete';
import {InvestmentChart} from '../../components/InvestmentChart/InvestmentChart';
import {DataGraph} from '../../components/InvestmentChart/InvestmentChart.types';
import {useInvestmentsAPI} from '../../hooks/useInvestmentsAPI';
import {InvestmentInfo} from './InvestmentInfo';
import {buttonBox} from './InvestmentView.styles';
import {useHistory, useLocation} from 'react-router';
import {Routes} from '../../helpers/routes';
import {modifyInvestment} from '../../api/investmentsAPI';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {submitInvestment} from './InvestmentView.helpers';

const initialParameters: InvestmentParameters = {
    initialDepositValue: 634,
    systematicDepositValue: 119,
    frequencyInYears: 1,
    durationInYears: 30,
    returnOfInvestment: 9,
    risk: 0.14,
};

enum InvestmentCategories {
    GOLD = 'Gold',
    REAL_ESTATE = 'Real estate',
    BONDS = 'Bonds',
    STOCK_MARKET = 'Stock Market',
}

export const InvestmentView: React.FC = () => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const investmentId = query.get('investmentId') as number | null;

    const [parameters, setParameters] = useState<InvestmentParameters>(initialParameters);
    const {data, fetchData, isFetching} = useInvestmentsAPI(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [portfoliosNames, setPortfoliosNames] = useState<string[]>([]);
    const [portfolioName, setPortfolioName] = useState('');
    const [investmentCategory, setInvestmentCategory] = useState('');
    const [investmentName, setInvestmentName] = useState('');
    const categories = [
        InvestmentCategories.GOLD,
        InvestmentCategories.BONDS,
        InvestmentCategories.REAL_ESTATE,
        InvestmentCategories.STOCK_MARKET,
    ];

    const {portfolios} = usePortfoliosAPI();

    useEffect(() => {
        if (!isFetching) {
            fetchData({
                ...parameters,
                returnOfInvestment: parameters.returnOfInvestment / 100,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (portfolios) setPortfoliosNames(portfolios.map(({name}) => name));
    }, [portfolios]);

    const handleCalculateClick = async () => {
        fetchData({
            ...parameters,
            returnOfInvestment: parameters.returnOfInvestment / 100,
        });
    };

    const handleSaveToPortfolio = () => {
        handleCalculateClick().then(() => {
            setDialogOpen(true);
        });
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAdd = () => {
        submitInvestment(data, portfolioName, investmentCategory, investmentName, portfolios, parameters).then(() => {
            setDialogOpen(false);
            setSnackbarOpen(true);
            history.push(Routes.PORTFOLIOS);
        });
    };

    const handleModifyInvestment = () => {
        if (data && investmentId) {
            modifyInvestment(data, investmentId).then(() => {
                history.push(Routes.PORTFOLIOS);
            });
        }
    };

    return (
        <>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Saved to portfolio!
                </Alert>
            </Snackbar>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please provide some details about investment</DialogContentText>
                    <FreeSoloAutocomplete
                        label="Portfolio name"
                        items={portfoliosNames}
                        value={portfolioName}
                        onChange={setPortfolioName}
                    />
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
                        value={investmentCategory}
                        onChange={setInvestmentCategory}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDialogAdd} type={'submit'} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
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
                        onClick={handleCalculateClick}
                    >
                        Calculate
                    </Button>

                    {investmentId === null ? (
                        <Button
                            disabled={isFetching}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25, marginLeft: 32}}
                            onClick={handleSaveToPortfolio}
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
            )}
        </>
    );
};
