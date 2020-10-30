import {AppBar, Box, Button, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import {useUserState} from '../../contexts/authContext';
import {Link, useLocation} from 'react-router-dom';
import {getGoBackRoute, routeToText} from './NavBar.helpers';
import * as styles from './NavBar.styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {UserMenu} from '../UserMenu/UserMenu';
import {Routes} from '../../helpers/routes';

export const NavBar: React.FC = () => {
    const authContext = useUserState();
    const location = useLocation();

    const isAuth = authContext.isAuth;
    const nav_title = routeToText(location.pathname);

    const inPortfolio = nav_title === 'portfolio';
    const inInvestment = nav_title === 'investment details';

    const GoBack = () => (
        <Link className={styles.Arrow} to={getGoBackRoute(isAuth, inInvestment)}>
            <ArrowBackIosIcon />
        </Link>
    );

    const LoginButton = () => (
        <Link className={styles.Link} to={Routes.LOGIN}>
            <Button color="inherit">{'Login/Sign up'}</Button>
        </Link>
    );

    return (
        <AppBar position="static">
            <Toolbar className={styles.StyledToolbar}>
                <Box className={styles.LeftBox} flexGrow={1}>
                    {inPortfolio ? '' : <GoBack />}
                    <Typography className={inPortfolio ? styles.TitleNoArrow : styles.TitleArrow}>{nav_title}</Typography>
                </Box>
                <Box>{isAuth ? <UserMenu username={authContext.username} /> : <LoginButton />}</Box>
            </Toolbar>
        </AppBar>
    );
};
