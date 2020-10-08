import React from 'react';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {PeriodUnit} from '../../views/InvestmentView/InvestmentView.types';

interface Props {
    periodUnit: PeriodUnit;
    setPeriodUnit: React.Dispatch<React.SetStateAction<PeriodUnit>>;
}

export const RadioPeriodSelector = (props: Props) => {
    const {periodUnit, setPeriodUnit} = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPeriodUnit(event.target.value as PeriodUnit);
    };

    return (
        <>
            <FormControl component="fieldset">
                <RadioGroup aria-label="period" value={periodUnit} onChange={handleChange}>
                    <FormControlLabel value={PeriodUnit.YEARS} control={<Radio color="default" />} label="yearly" />
                    <FormControlLabel value={PeriodUnit.MONTHS} control={<Radio color="default" />} label="monthly" />
                    <FormControlLabel value={PeriodUnit.WEEKS} control={<Radio color="default" />} label="weekly" />
                    <FormControlLabel value={PeriodUnit.DAYS} control={<Radio color="default" />} label="daily" />
                </RadioGroup>
            </FormControl>
        </>
    );
};
