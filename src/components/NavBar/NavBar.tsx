import {AppBar, Box, Button, styled, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import {useUserState} from '../../contexts/authContext';
import {Link, useLocation} from 'react-router-dom';
import {routeToText} from './NavBar.helpers';
import * as styles from './NavBar.styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface Props {}

export const NavBar = (props: Props) => {
    const authContext = useUserState();
    const loginText = authContext.isAuth ? 'Hello ' + authContext.username : 'Login/Sign up';
    const location = useLocation();
    const nav_title = routeToText(location.pathname);
    const inPortfolio = nav_title === 'portfolio';
    const goBack = () => {
        return (
            <Link className={styles.Arrow} to={'/portfolios'}>
                <ArrowBackIosIcon />
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
                <Box>
                    <Link className={styles.Link} to={'/login'}>
                        <Button color="inherit">{loginText}</Button>
                    </Link>
                </Box>
            </StyledToolbar>
        </AppBar>
    );
};

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'flex-end',
    backgroundColor: '#3461ff',
});
