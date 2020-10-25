import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {css} from 'emotion';
import React, {useState} from 'react';
import {InvestmentResults} from '../../components/InvestmentResults/InvestmentResults';
import {Separator} from '../../components/Separator/Separator';
import {usePortfoliosAPI} from '../../hooks/usePortfoliosAPI';
import {InvestmentItem} from './InvestmentItem';
import {InvestmentsTitleBox, TopBox} from './PortfolioView.styles';
import {Link} from 'react-router-dom';
import {DeleteForever} from '@material-ui/icons';
import {submitPortfolio} from './PortfolioView.helpes';
import {Routes} from '../../helpers/routes';

export const PortfolioView: React.FC = () => {
    const {portfolios, fetchPortfolio, portfolio, deleteCurrentPortfolio, deleteInvestment} = usePortfoliosAPI();
    console.log(portfolio.investments);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [portfolioName, setPortfolioName] = useState('');

    const handlePortfolioAdd = () => {
        setDialogOpen(true);
    };

    const handleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => fetchPortfolio(event.target.value as number);

    const handleDeletePortfolio = () => {
        deleteCurrentPortfolio();
    };

    const handleDeleteInvestment = (id: number) => {
        deleteInvestment(id);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAdd = () => {
        submitPortfolio(portfolioName).then(() => {
            setDialogOpen(false);
        });
    };

    return (
        <Container maxWidth="sm">
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add new portfolio</DialogContentText>
                    <TextField
                        label="Portfolio name"
                        type="text"
                        fullWidth
                        value={portfolioName}
                        variant="outlined"
                        onChange={event => setPortfolioName(event.target.value)}
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

            <Box className={TopBox}>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl size={'small'} variant="outlined" fullWidth>
                            <Select value={portfolio.id} onChange={handleSelectChange}>
                                <MenuItem key={0} value={0}>
                                    All Investments
                                </MenuItem>
                                {portfolios.map(portfolio => (
                                    <MenuItem key={portfolio.id} value={portfolio.id}>
                                        {portfolio.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <Box display={'flex'} justifyContent={'center'} color={'red'}>
                            {portfolio.id !== 0 && (
                                <IconButton
                                    size={'medium'}
                                    color="inherit"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={handleDeletePortfolio}
                                >
                                    <DeleteForever />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Fab style={{width: '100%'}} size="medium" variant="extended" color="primary" onClick={handlePortfolioAdd}>
                            <AddIcon />
                            Portfolio
                        </Fab>
                    </Grid>
                </Grid>
            </Box>

            <Separator text="Results" />
            <InvestmentResults
                totalChangePercent={portfolio.rateOfReturnPercentage}
                totalChange={portfolio.rateOfReturnValue}
                totalRiskPercentage={0}
                predictedChange={portfolio.totalInvestedCash + portfolio.rateOfReturnValue}
            />
            <Box className={InvestmentsTitleBox}>
                <Separator text="Investments" />
                <Link
                    to={portfolio.id !== 0 ? `${Routes.INVESTMENT_CALCULATOR}?portfolioId=${portfolio.id}` : Routes.INVESTMENT_CALCULATOR}
                >
                    <Fab size="small" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <Typography color="primary" variant="caption">
                        NAME
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography
                        className={css`
                            padding-left: 16px;
                        `}
                        color="primary"
                        variant="caption"
                    >
                        RISK
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="primary" variant="caption">
                        CHANGE
                    </Typography>
                </Grid>
            </Grid>

            <Box>
                {portfolio.investments.map(investment => (
                    <InvestmentItem
                        id={investment.id}
                        key={investment.id}
                        name={investment.name}
                        riskPercent={investment.risk * 100}
                        changePercent={investment.rateOfReturnPercentage}
                        onDelete={handleDeleteInvestment}
                    />
                ))}
            </Box>
        </Container>
    );
};
