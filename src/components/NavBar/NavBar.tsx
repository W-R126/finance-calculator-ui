import {AppBar, Button, styled, Toolbar} from '@material-ui/core';
import React from 'react';
import {useUserState} from '../../contexts/authContext';
import {Link, useLocation} from 'react-router-dom';
import {routeToText} from './NavBar.helpers';

interface Props {}

export const NavBar = (props: Props) => {
    const authContext = useUserState();
    const loginText = authContext.isAuth ? 'Hello ' + authContext.username : 'Login/Sign up';
    const location = useLocation();
    const nav_title = routeToText(location.pathname);
    const goBack = () => {
        return (
            <Link to={'/portfolios'}>
                <Button>Go back</Button>
            </Link>
        );
    };
    console.log(location.pathname);
    return (
        <AppBar position="static">
            <StyledToolbar>
                {nav_title !== 'portfolio' ? goBack() : ''}
                {nav_title}
                <Link to={'/login'}>
                    <Button color="inherit">{loginText}</Button>
                </Link>
            </StyledToolbar>
        </AppBar>
    );
};

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'flex-end',
    backgroundColor: '#3461ff',
});
