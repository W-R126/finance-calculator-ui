import {Box, Button, Container, Paper, TextField, Typography} from '@material-ui/core';
import {Formik, FormikHelpers} from 'formik';
import React from 'react';
import {useUserState} from '../../contexts/authContext';
import {useAuthAPI} from '../../hooks/useAuthApi';
import {LoginFormData} from './LoginView.types';
import {AuthAction} from '../../api/authAPI.types';
import {useAuthDispatch} from '../../contexts/authContext';
import {logOut} from '../../contexts/authAction.types';

export const LoginView: React.FC = () => {
    const [fetchData, isFetching] = useAuthAPI();
    const authContext = useUserState();
    const authDispatch = useAuthDispatch();

    const handleOnSubmit = (values: LoginFormData, {setSubmitting}: FormikHelpers<LoginFormData>) => {
        setTimeout(() => setSubmitting(false), 1000);

        // todo temporary for test
        fetchData({
            action: AuthAction.SIGN_UP,
            data: {
                username: 'name',
                password: 'pass',
            },
        });
        // end temporary for test
    };

    // todo temporary demonstrate logout
    const handleLogOut = () => {
        authDispatch(logOut());
    };

    // todo temporary for test
    console.log(authContext, isFetching);
    const user = 'hello: ' + authContext.username + ' logged in: ' + authContext.isAuth + ' error: ' + authContext.error;
    // end temporary for test

    const validate = () => {};
    return (
        <Container maxWidth="sm">
            {/*todo below is just to demonstrate log out / log in*/}
            <p onClick={handleLogOut}>click to Log out</p>
            <p>{user}</p>
            {/* end mock log out*/}
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
