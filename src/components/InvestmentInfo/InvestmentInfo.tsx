import React from 'react';
import {Separator} from '../Separator/Separator';
import {InvestmentParameters} from './InvestmentParameters';
import {InvestmentResults} from './InvestmentResults';

//TODO adjust types
interface Props {
    parameters: any;
    setParameters: any;
}

export const InvestmentInfo = (props: Props) => {
    return (
        <>
            <Separator text="Results" />
            <InvestmentResults
                annualChangePercent={13}
                annualChange={245}
                totalChangePercent={13}
                totalChange={245}
                predictedChange={2500}
            />
            <Separator text="Parameters" />
            <InvestmentParameters />
        </>
    );
};
