import {Box, Typography} from '@material-ui/core';
import * as format from '../../helpers/formatNumber';
import React from 'react';
import {currencyUnit} from '../../views/InvestmentView/InvestmentView.constants';
import {css} from 'emotion';

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
