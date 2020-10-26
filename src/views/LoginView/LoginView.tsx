import {Backdrop, Box, Button, CircularProgress, Container, Paper, TextField, Typography} from '@material-ui/core';
import {Formik, FormikHelpers} from 'formik';
import React, {useState} from 'react';
import {AuthAction} from '../../api/authAPI.types';
import {useUserState} from '../../contexts/authContext';
import {useAuthAPI} from '../../hooks/useAuthApi';
import {LoginFormData} from './LoginView.types';
import {css} from 'emotion';

export const LoginView: React.FC = () => {
    // eslint-disable-next-line
    // TODO add fetching indicator
    const [fetchData, isFetching] = useAuthAPI();
    const authContext = useUserState();
    const [isSigningUp, setIsSigningUp] = useState(false);

    const errorMessage = authContext.error;

    const handleOnSubmit = (values: LoginFormData, {setSubmitting}: FormikHelpers<LoginFormData>) => {
        setTimeout(() => setSubmitting(false), 1000);
        const action = isSigningUp ? AuthAction.SIGN_UP : AuthAction.SIGN_IN;
        fetchData({
            action: action,
            data: {
                username: values.username,
                password: values.password,
            },
        });
        // TODO: make redirection to portfolio page after success
    };

    const handleLogIn = () => {
        setIsSigningUp(false);
    };

    const handleSignUp = () => {
        setIsSigningUp(true);
    };

    const validate = () => {};
    return (
        <Container maxWidth="sm">
            <Box mt={3} textAlign="center">
                <Paper>
                    <Box p={2}>
                        <Typography variant="h3">LOGIN</Typography>
                    </Box>
                </Paper>
            </Box>
            <Box mt={3}>
                <Paper>
                    <Box p={3}>
                        <Formik initialValues={{username: '', password: ''} as LoginFormData} validate={validate} onSubmit={handleOnSubmit}>
                            {props => {
                                const {values, touched, errors, isSubmitting, isValid, handleChange, handleBlur, handleSubmit} = props;

                                return (
                                    <form onSubmit={handleSubmit}>
                                        <Box mt={3}>
                                            <TextField
                                                label="Username"
                                                type="text"
                                                name="username"
                                                fullWidth
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                error={!!(errors.username && touched.username)}
                                                helperText={errors.username && touched.username && errors.username}
                                            />
                                        </Box>

                                        <Box mt={3}>
                                            <TextField
                                                label="Password"
                                                type="password"
                                                name="password"
                                                fullWidth
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                error={!!(errors.password && touched.password)}
                                                helperText={errors.password && touched.password && errors.password}
                                            />
                                        </Box>
                                        {errorMessage}
                                        <Box mt={3} display="flex" justifyContent="center">
                                            <Button
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={isSubmitting || !isValid}
                                                onClick={handleLogIn}
                                            >
                                                Log In
                                            </Button>
                                        </Box>
                                        <Box mt={3} display="flex" justifyContent="center">
                                            <Button
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={isSubmitting || !isValid}
                                                onClick={handleSignUp}
                                            >
                                                Sign up
                                            </Button>
                                        </Box>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Box>
                </Paper>
            </Box>

            <Backdrop open={isFetching} style={{zIndex: 999, color: '#fff'}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};
