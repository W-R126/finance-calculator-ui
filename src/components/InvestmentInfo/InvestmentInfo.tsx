import {Box, styled, Typography} from '@material-ui/core';
import * as format from '../../helpers/formatNumber';
import React from 'react';

const PositiveChange = styled(Typography)({
    color: '#00cd08',
});

const PredicatedValue = styled(Typography)({
    color: '#3461ff',
});

interface Props {
    annualChangePercent: number;
    annualChange: number;

    totalChangePercent: number;
    totalChange: number;

    predictedChange: number;
}

export const InvestmentInfo = (props: Props) => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Annual change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(props.annualChangePercent)} {props.annualChange}£
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Total change</Typography>
                <PositiveChange variant="h6">
                    {format.asPercentage(props.totalChangePercent)} {props.totalChange}£
                </PositiveChange>
            </Box>

            <Box display="flex" justifyContent="space-between" px="2rem">
                <Typography>Predicted value</Typography>
                <PredicatedValue variant="h4">{props.predictedChange}£</PredicatedValue>
            </Box>
        </Box>
    );
};
