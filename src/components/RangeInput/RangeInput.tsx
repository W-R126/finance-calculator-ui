import React from 'react';
import {Grid, InputAdornment, OutlinedInput, Slider, Typography} from '@material-ui/core';
import {css} from 'emotion';

interface Props {
    minValue: number;
    maxValue: number;

    unit?: string;
    label: string;
    label2?: string;

    value: number;
    onChange: (value: number) => void;
}

export const RangeInput: React.FC<Props> = ({value, onChange, minValue, maxValue, label, label2, unit}) => {
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        onChange(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < minValue) {
            onChange(minValue);
        } else if (value > maxValue) {
            onChange(maxValue);
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid
                item
                xs={6}
                className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                `}
            >
                <Typography
                    className={css`
                        font-size: 18px;
                    `}
                    variant="subtitle2"
                    component="p"
                >
                    {label}
                </Typography>
            </Grid>
            <Grid
                item
                xs={2}
                className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                `}
            >
                {label2 !== undefined && (
                    <Typography
                        className={css`
                            font-size: 18px;
                            color: #3461ff;
                            text-align: right;
                            padding-right: 1rem;
                        `}
                        variant="subtitle2"
                        component="p"
                    >
                        {label2}
                    </Typography>
                )}
            </Grid>
            <Grid
                item
                xs={4}
                className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                `}
            >
                <OutlinedInput
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: Math.floor((maxValue - minValue) * 0.05),
                        min: minValue,
                        max: maxValue,
                        type: 'number',
                        'aria-labelledby': 'range-input',
                        'data-testid': 'input',
                    }}
                    className={css`
                        width: 100%;
                    `}
                    endAdornment={unit ? <InputAdornment position="end">{unit}</InputAdornment> : undefined}
                />
            </Grid>
            <Grid item xs={12}>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={minValue}
                    max={maxValue}
                />
            </Grid>
        </Grid>
    );
};
