import React from 'react';
import {Box, Container, Paper, Typography} from '@material-ui/core';

export const LoginView: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Paper>
                    <Typography variant="h3">LOGIN</Typography>
                </Paper>
            </Box>
            <Box mt={3}>
                <Paper>
                    <Box p={3}>
                        <Typography>LOGIN FORM GOES HERE</Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};
