import {Box, Button, Container, Paper, TextField, Typography} from '@material-ui/core';
import {Formik, FormikHelpers} from 'formik';
import React from 'react';
import {loginSuccess} from '../../contexts/authAction.types';
import {useAuthDispatch, useUserState} from '../../contexts/authContext';
import {useAuthAPI} from '../../hooks/useAuthApi';
import {LoginFormData} from './LoginView.types';

export const LoginView: React.FC = () => {
    const [data, fetchData] = useAuthAPI();
    const authDispatch = useAuthDispatch();
    const authContext = useUserState();

    const handleOnSubmit = (values: LoginFormData, {setSubmitting}: FormikHelpers<LoginFormData>) => {
        setTimeout(() => setSubmitting(false), 1000);

        // todo temporary for test
        fetchData({username: 'name', password: 'pass'});
        if (data != null) {
            authDispatch(loginSuccess(data));
        }
    };

    // todo temporary for test
    console.log(authContext);

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

                                        <Box mt={3} display="flex" justifyContent="center">
                                            <Button
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={isSubmitting || !isValid}
                                            >
                                                Log In
                                            </Button>
                                        </Box>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};
