import {Autocomplete, createFilterOptions} from '@material-ui/lab';
import React from 'react';
import {TextField} from '@material-ui/core';
import {FreeSolo} from './FreeSoloAutocomplete.styles';

interface Props {
    label: string;
    initialValue: string;
    onChange: (value: string) => void;
    items: string[];
}

const filter = createFilterOptions<OptionType>();

interface OptionType {
    inputValue?: string;
    title: string;
}

export const FreeSoloAutocomplete: React.FC<Props> = ({label, initialValue, onChange, items}) => {
    const [value, setValue] = React.useState<OptionType | null>(null);
    const options: OptionType[] = items.map(item => ({inputValue: item, title: item}));

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                        onChange(newValue);
                        setValue({inputValue: newValue, title: newValue});
                    });
                } else if (newValue && newValue.inputValue) {
                    onChange(newValue.inputValue);
                    setValue(newValue);
                } else {
                    setValue(newValue);
                    onChange(newValue ? newValue.title : '');
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params) as OptionType[];

                if (params.inputValue !== '') {
                    filtered.push({inputValue: params.inputValue, title: `Add "${params.inputValue}"`});
                }

                return filtered;
            }}
            options={options}
            getOptionLabel={option => {
                if (typeof option === 'string') return option;
                if (option.inputValue) return option.inputValue;
                else return option.title;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={option => option.title}
            freeSolo
            className={FreeSolo}
            renderInput={params => <TextField {...params} label={label} variant="outlined" fullWidth />}
        />
    );
};
