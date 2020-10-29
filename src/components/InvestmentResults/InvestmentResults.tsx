import {Box, Typography} from '@material-ui/core';
import {css} from 'emotion';
import React from 'react';
import * as format from '../../helpers/formatNumber';
import {currencyUnit} from '../../views/InvestmentView/InvestmentView.constants';

interface Props {
    totalChangePercent: number;
    totalChange: number;
    totalRiskPercentage: number;

    predictedChange: number;
}

export const InvestmentResults: React.FC<Props> = ({totalChangePercent, totalChange, totalRiskPercentage: totalRisk, predictedChange}) => {
    const currency = currencyUnit;
    const accuracy = 2;

    const round = (value: number) => Math.round(value * Math.pow(10, accuracy)) / Math.pow(10, accuracy);

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography>Total change</Typography>
                <Typography
                    variant="h6"
                    className={css`
                        color: #00cd08;
                    `}
                >
                    {format.asPercentage(totalChangePercent * 100)} {round(totalChange)}
                    {currency}
                </Typography>
            </Box>
            {totalRisk !== -1 && (
                <Box display="flex" justifyContent="space-between">
                    <Typography>Total risk factor</Typography>
                    <Typography variant="h6" color="secondary">
                        {format.asPercentage(totalRisk * 100)}
                    </Typography>
                </Box>
            )}

            <Box display="flex" justifyContent="space-between">
                <Typography>Predicted value</Typography>
                <Typography
                    variant="h4"
                    className={css`
                        color: #3461ff;
                    `}
                >
                    {round(predictedChange)}
                    {currency}
                </Typography>
            </Box>
        </>
    );
};
