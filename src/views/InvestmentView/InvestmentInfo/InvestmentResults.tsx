import {Box, styled, Typography} from '@material-ui/core';
import * as format from '../../../helpers/formatNumber';
import React from 'react';
import {currencyUnit} from '../InvestmentView.constants';

interface Props {
    totalChangePercent: number;
    totalChange: number;

    predictedChange: number;
}

export const InvestmentResults: React.FC<Props> = ({totalChangePercent, totalChange, predictedChange}) => {
    const currency = currencyUnit;
    const accurance = 2;

    const round = (value: number) => Math.round(value * Math.pow(10, accurance)) / Math.pow(10, accurance);

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography>Total change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(totalChangePercent * 100)} {round(totalChange)}
                    {currency}
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography>Predicted value</Typography>
                <PredicatedValue variant="h4">
                    {round(predictedChange)}
                    {currency}
                </PredicatedValue>
            </Box>
        </>
    );
};

const PositiveChange = styled(Typography)({
    color: '#00cd08',
});

const PredicatedValue = styled(Typography)({
    color: '#3461ff',
});
