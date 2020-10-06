import {Grid, Input, Slider, Typography} from '@material-ui/core';
import {css} from 'emotion';
import React, {useState} from 'react';

interface Props {
    minValue: number;
    maxValue: number;

    label: string;
}

export const RangeInput = (props: Props) => {
    const [value, setValue] = useState<number | string | Array<number | string>>(props.minValue);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < props.minValue) {
            setValue(props.minValue);
        } else if (value > props.maxValue) {
            setValue(props.maxValue);
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={8}>
                <Typography gutterBottom>{props.label}</Typography>
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
                <Input
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 10,
                        min: props.minValue,
                        max: props.maxValue,
                        type: 'number',
                        'aria-labelledby': 'range-input',
                        'data-testid': 'input',
                    }}
                    className={css`
                        width: 100%;
                    `}
                />
            </Grid>
            <Grid item xs={12}>
                <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider" />
            </Grid>
        </Grid>
    );
};
