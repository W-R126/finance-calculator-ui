import React from 'react';
import {FreeSoloAutocomplete} from '../../../src/components/FreeSoloAutocomplete/FreeSoloAutocomplete';
import {render, screen, fireEvent} from '@testing-library/react';

const options = ['op1', 'op2', 'op3', 'op4', 'op5'];

describe('FreeSoloAutocomplete.tsx', () => {
    beforeEach(() => {
        render(<FreeSoloAutocomplete label={'LabelToFind'} initialValue={'initialValueToFind'} onChange={arg => {}} items={options} />);
    });
    test('should display label', () => {
        screen.getAllByLabelText('LabelToFind');
    });
    test('should show input value in text box', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'asdf'}});
        expect(input.value).toBe('asdf');
    });
    test('should show suggestion when name on list', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'op'}});

        options.forEach(option => {
            screen.getByText(option);
        });
    });
    test('should show Add "" when unknown option provided', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'unknown'}});
        screen.getByText('Add "unknown"');
    });
    test('should update input field when Add suggestion clicked', () => {
        const input = screen.getByRole('textbox');

        fireEvent.change(input, {target: {value: 'unknown'}});
        const suggestion = screen.getByText('Add "unknown"');
        fireEvent.click(suggestion);
        expect(input.value).toBe('unknown');
    });
    test('should update input field when suggestion clicked', () => {
        const input = screen.getByRole('textbox');

        fireEvent.change(input, {target: {value: 'op'}});
        const suggestion = screen.getByText('op1');
        fireEvent.click(suggestion);
        expect(input.value).toBe('op1');
    });
});
