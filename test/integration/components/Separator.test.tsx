import React from 'react';
import {render, screen} from '@testing-library/react';
import {Separator} from '../../../src/components/Separator/Separator';

describe('Separator.tsx', () => {
    test(`renders provided text`, () => {
        render(<Separator text="hello world!" />);

        screen.getByText('hello world!');
    });
});
