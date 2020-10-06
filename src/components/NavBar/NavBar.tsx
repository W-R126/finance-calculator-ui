import {AppBar, Button, styled, Toolbar} from '@material-ui/core';
import React from 'react';

interface Props {}

export const NavBar = (props: Props) => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <Button color="inherit">Login</Button>
            </StyledToolbar>
        </AppBar>
    );
};

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'flex-end',
    backgroundColor: '#3461ff',
});
