import React, {useState} from 'react';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

interface Props {
    periodUnit: string;
    setPeriodUnit: React.Dispatch<React.SetStateAction<string>>;
}

export const RadioPeriodSelector = (props: Props) => {
    const {periodUnit, setPeriodUnit} = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPeriodUnit(event.target.value);
    };

    return (
        <>
            <FormControl component="fieldset">
                <RadioGroup aria-label="period" value={periodUnit} onChange={handleChange}>
                    <FormControlLabel value="years" control={<Radio color="default" />} label="yearly" />
                    <FormControlLabel value="months" control={<Radio color="default" />} label="monthly" />
                    <FormControlLabel value="weeks" control={<Radio color="default" />} label="weekly" />
                    <FormControlLabel value="days" control={<Radio color="default" />} label="daily" />
                </RadioGroup>
            </FormControl>
        </>
    );
};
