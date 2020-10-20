import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Grid, MenuItem, Slider, TextField, Typography} from '@material-ui/core';
import {FrequencyUnit} from './FrequencySelector.types';
import {convertFromYears, convertToYears, getMaxValueFor} from './FrequencySelector.helpers';

interface Props {
    value: number;
    onChange: (value: number) => void;

    label: string;
}

export const FrequencySelector: React.FC<Props> = ({value, onChange, label}) => {
    const [unit, setUnit] = useState(FrequencyUnit.YEARS);

    const minValue = 1;
    const maxValue = getMaxValueFor(unit);
    const currentValue = Math.floor(convertFromYears(value, unit));

    const emitValue = (value: number) => {
        if (value < minValue) {
            onChange(convertToYears(minValue, unit));
        } else if (value > maxValue) {
            onChange(convertToYears(maxValue, unit));
        } else {
            onChange(convertToYears(value, unit));
        }
    };

    useEffect(() => {
        if (currentValue < minValue) {
            onChange(convertToYears(minValue, unit));
        } else if (currentValue > maxValue) {
            onChange(convertToYears(maxValue, unit));
        }
    });

    const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;

        if (value !== '') {
            emitValue(parseInt(value));
        }
    };

    const handleSliderChange = (event: unknown, value: number | number[]) => {
        if (typeof value === 'number') {
            emitValue(value);
        }
    };

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setUnit(parseInt(event.target.value));
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={currentValue}
                        onChange={handleTextFieldChange}
                        type="number"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs>
                    <TextField value={unit} onChange={handleUnitChange} select variant="outlined" size="small" fullWidth>
                        <MenuItem value={FrequencyUnit.YEARS}>years</MenuItem>
                        <MenuItem value={FrequencyUnit.MONTHS}>months</MenuItem>
                        <MenuItem value={FrequencyUnit.WEEKS}>weeks</MenuItem>
                        <MenuItem value={FrequencyUnit.DAYS}>days</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Slider value={currentValue} onChange={handleSliderChange} aria-labelledby="frequency selector" min={minValue} max={maxValue} />
        </Box>
    );
};
