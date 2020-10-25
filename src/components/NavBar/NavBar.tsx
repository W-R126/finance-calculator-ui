import {AppBar, Box, Button, styled, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import {useUserState} from '../../contexts/authContext';
import {Link, useLocation} from 'react-router-dom';
import {routeToText} from './NavBar.helpers';
import * as styles from './NavBar.styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {UserMenu} from '../UserMenu/UserMenu';

interface Props {}

export const NavBar = (props: Props) => {
    // hooks
    const authContext = useUserState();
    const location = useLocation();

    const isAuth = authContext.isAuth;
    const nav_title = routeToText(location.pathname);
    const inPortfolio = nav_title === 'portfolio';

    const goBack = () => {
        return (
            <Link className={styles.Arrow} to={'/portfolios'}>
                <ArrowBackIosIcon />
            </Link>
        );
    };

    const userMenu = () => {
        return <UserMenu username={authContext.username} />;
    };

    const loginButton = () => {
        return (
            <Link className={styles.Link} to={'/login'}>
                <Button color="inherit">{'Login/Sign up'}</Button>
            </Link>
        );
    };

    return (
        <AppBar position="static">
            <StyledToolbar>
                <Box className={styles.LeftBox} flexGrow={1}>
                    {inPortfolio ? '' : goBack()}
                    <Typography className={inPortfolio ? styles.TitleNoArrow : styles.TitleArrow}>{nav_title}</Typography>
                </Box>
                <Box>{isAuth ? userMenu() : loginButton()}</Box>
            </StyledToolbar>
        </AppBar>
    );
};

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'flex-end',
    backgroundColor: '#3461ff',
});
