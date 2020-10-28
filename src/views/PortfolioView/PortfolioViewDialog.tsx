import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core';

interface Props {
    dialogOpen: boolean;
    setPortfolioName: (arg0: string) => void;
    portfolioName: string;
    handleDialogClose: () => void;
    handleDialogAdd: () => void;
}

export const AddPortfolioDialog: React.FC<Props> = ({dialogOpen, handleDialogAdd, handleDialogClose, setPortfolioName, portfolioName}) => (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add new portfolio</DialogTitle>
        <DialogContent>
            <DialogContentText>Please provide portfolio name</DialogContentText>
            <TextField
                label="Portfolio name"
                type="text"
                fullWidth
                value={portfolioName}
                variant="outlined"
                onChange={event => setPortfolioName(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDialogAdd} type={'submit'} color="primary">
                Add
            </Button>
        </DialogActions>
    </Dialog>
);
