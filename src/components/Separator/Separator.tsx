import {Box, Typography} from '@material-ui/core';
import {css} from 'emotion';
import React from 'react';

interface Props {
    text: string;
}

export const Separator = (props: Props) => {
    return (
        <Box
            className={css`
                text-align: center;
                padding: 1rem;
                color: #3461ff;
            `}
        >
            <Typography variant="h5">{props.text}</Typography>
        </Box>
    );
};
