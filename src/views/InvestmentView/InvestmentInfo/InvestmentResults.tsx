import {Box, styled, Typography} from '@material-ui/core';
import * as format from '../../../helpers/formatNumber';
import React, {useContext} from 'react';
import {CurrencyContext} from '..';

interface Props {
    annualChangePercent: number;
    annualChange: number;

    totalChangePercent: number;
    totalChange: number;

    predictedChange: number;
}

export const InvestmentResults = (props: Props) => {
    const currencyContext = useContext(CurrencyContext);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Annual change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(props.annualChangePercent)} {props.annualChange}
                    {currencyContext}
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Total change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(props.totalChangePercent)} {props.totalChange}
                    {currencyContext}
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Predicted value</Typography>
                <PredicatedValue variant="h4">
                    {props.predictedChange}
                    {currencyContext}
                </PredicatedValue>
            </Box>
        </Box>
    );
};

const PositiveChange = styled(Typography)({
    color: '#00cd08',
});

const PredicatedValue = styled(Typography)({
    color: '#3461ff',
});
