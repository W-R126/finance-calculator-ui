import {Grid, InputAdornment, OutlinedInput, Slider, Typography} from '@material-ui/core';
import {css} from 'emotion';
import React, {useEffect, useState} from 'react';

interface Props {
    minValue: number;
    maxValue: number;

    unit?: string;
    label: string;
    label2?: string;

    valueChanged?: (value: number) => void;
}

export const RangeInput = (props: Props) => {
    const [value, setValue] = useState<number | string | Array<number | string>>((props.minValue + props.maxValue) / 2);

    useEffect(() => {
        if (props.valueChanged !== undefined) {
            props.valueChanged(typeof value === 'number' ? value : 0);
        }
    }, [value, props]);

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
                    {props.label}
                </Typography>
            </Grid>
            <Grid
                item
                xs={3}
                className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                `}
            >
                {props.label2 !== undefined && (
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
                        {props.label2}
                    </Typography>
                )}
            </Grid>
            <Grid
                item
                xs={3}
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
                    endAdornment={props.unit ? <InputAdornment position="end">{props.unit}</InputAdornment> : undefined}
                />
            </Grid>
            <Grid item xs={12}>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={props.minValue}
                    max={props.maxValue}
                />
            </Grid>
        </Grid>
    );
};
