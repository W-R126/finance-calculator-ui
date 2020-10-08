import {Box, Button, Container} from '@material-ui/core';
import React, {useState} from 'react';
import {InvestmentInfo} from '../../components/InvestmentInfo/InvestmentInfo';
import {NavBar} from '../../components/NavBar/NavBar';
import {buttonBox} from './InvestmentView.styles';

export const CurrencyContext = React.createContext('$');

interface Props {}

export const InvestmentView = (props: Props) => {
    const [submitting, setSubmitting] = useState(false);
    const [parameters, setParameters] = useState([]);
    const onSubmit = () => {};

    return (
        <React.Fragment>
            <CurrencyContext.Provider value={'$'}>
                <NavBar />
                <Container maxWidth="sm">
                    <InvestmentInfo parameters={parameters} setParameters={setParameters} />
                    <Box className={buttonBox}>
                        <Button
                            type={'submit'}
                            disabled={submitting}
                            variant={'contained'}
                            color={'primary'}
                            style={{borderRadius: 25}}
                            onClick={onSubmit}
                        >
                            SAVE TO PORTFOLIO
                        </Button>
                    </Box>
                </Container>
            </CurrencyContext.Provider>
        </React.Fragment>
    );
};
