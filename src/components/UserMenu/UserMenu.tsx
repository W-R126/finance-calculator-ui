import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as styles from './UserMenu.styles';
import {logOut} from '../../contexts/authAction.types';
import {useAuthDispatch} from '../../contexts/authContext';
import {Link} from 'react-router-dom';

interface Props {
    username: string;
}

export const UserMenu: React.FC<Props> = ({username}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authDispatch = useAuthDispatch();

    const handleClick = (event: any) => {
        // todo fix type
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        authDispatch(logOut());
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <div className={styles.DropArrow}>{username}</div>
                <ArrowDropDownIcon className={styles.DropArrow} />
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleLogOut}>
                    <Link className={styles.Link} to={'/login'}>
                        LOGOUT
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} value={1}>
                    <Link className={styles.Link} to={'/login'}>
                        SWITCH ACCOUNT
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
};
