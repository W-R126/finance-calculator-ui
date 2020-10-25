import {Autocomplete, createFilterOptions} from '@material-ui/lab';
import React from 'react';
import {TextField} from '@material-ui/core';
import {FreeSolo} from './FreeSoloAutocomplete.styles';

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    items: string[];
}

const filter = createFilterOptions<string>();

export const FreeSoloAutocomplete: React.FC<Props> = ({label, value, onChange, items}) => {
    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            onChange(newValue);
                        });
                    } else {
                        onChange(newValue ? newValue : '');
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as string[];

                    if (params.inputValue !== '') {
                        filtered.push(params.inputValue);
                    }

                    return filtered;
                }}
                options={items}
                getOptionLabel={option => option}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={option => option}
                freeSolo
                className={FreeSolo}
                renderInput={params => <TextField {...params} label={label} variant="outlined" fullWidth />}
            />
        </>
    );
};
