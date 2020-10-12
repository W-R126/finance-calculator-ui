import React from 'react';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {PeriodUnit} from '../../views/InvestmentView/InvestmentView.types';

interface RadioPeriodSelectorProps {
    periodUnit: PeriodUnit;
    onChange: React.Dispatch<React.SetStateAction<PeriodUnit>>;
}

export const RadioPeriodSelector: React.FC<RadioPeriodSelectorProps> = ({periodUnit, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as PeriodUnit);
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
