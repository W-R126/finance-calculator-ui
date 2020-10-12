import {Box, styled, Typography} from '@material-ui/core';
import * as format from '../../../helpers/formatNumber';
import React from 'react';
import {currencyUnit} from './../InvestmentView.constants';

interface Props {
    annualChangePercent: number;
    annualChange: number;

    totalChangePercent: number;
    totalChange: number;

    predictedChange: number;
}

export const InvestmentResults: React.FC<Props> = ({
    annualChangePercent,
    annualChange,
    totalChangePercent,
    totalChange,
    predictedChange,
}) => {
    const currency = currencyUnit;

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Annual change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(annualChangePercent)} {annualChange}
                    {currency}
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Total change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(totalChangePercent)} {totalChange}
                    {currency}
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Predicted value</Typography>
                <PredicatedValue variant="h4">
                    {predictedChange}
                    {currency}
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
