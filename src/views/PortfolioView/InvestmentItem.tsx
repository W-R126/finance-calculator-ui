import {Box, Button, Typography} from '@material-ui/core';
import React from 'react';
import * as format from '../../helpers/formatNumber';
import {InvestmentsChange, InvestmentsName, MainBox, RightBox} from './InvestmentItem.styles';

interface Props {
    name: string;
    changePercent: number;
}
export const InvestmentItem: React.FC<Props> = ({name, changePercent}) => {
    const handleDetailsClick = () => {};

    return (
        <Box className={MainBox}>
            <Typography className={InvestmentsName}>{name}</Typography>
            <Box className={RightBox}>
                <Typography className={InvestmentsChange}>{format.asPercentage(changePercent)}</Typography>
                <Button color="primary" onClick={handleDetailsClick}>
                    Details
                </Button>
            </Box>
        </Box>
    );
};
