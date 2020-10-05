import React from 'react';
import {render, screen} from '@testing-library/react';
import {NavBar} from '../../../src/components/NavBar/NavBar';

describe('NavBar.tsx', () => {
    test(`renders 'login' when logged out`, () => {
        render(<NavBar />);

        screen.getByText('Login');
    });
});
