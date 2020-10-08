import React, {useContext, useEffect, useState} from 'react';
import {RadioPeriodSelector} from '../../../components/RadioPeriodSelector/RadioPeriodSelector';
import {RangeInput} from '../../../components/RangeInput/RangeInput';
import {Separator} from '../../../components/Separator/Separator';
import {CurrencyContext} from '../InvestmentView';
import {InvestmentParameters, PeriodUnit} from '../InvestmentView.types';
import {InvestmentResults} from './InvestmentResults';

interface Props {
    parameters: InvestmentParameters;
    setParameters: React.Dispatch<React.SetStateAction<InvestmentParameters>>;
}

export const InvestmentInfo: React.FC<Props> = ({parameters, setParameters}) => {
    const currencyContext = useContext(CurrencyContext);
    const [periodFrequency, setPeriodFrequency] = useState(PeriodUnit.YEARS);
    const [periodDuration, setPeriodDuration] = useState(PeriodUnit.YEARS);

    useEffect(() => {
        setParameters({...parameters, frequencyUnit: periodFrequency, durationUnit: periodDuration});
    }, [periodDuration, periodFrequency]);

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
            <RangeInput minValue={0} maxValue={4000} label="initial deposit" unit={currencyContext} />
            <RangeInput minValue={0} maxValue={100} label="systematic deposit" unit={currencyContext} />
            <RangeInput minValue={0} maxValue={4} label="frequency" label2="every" unit={periodFrequency} />
            <RadioPeriodSelector periodUnit={periodFrequency} setPeriodUnit={setPeriodFrequency} />
            <RangeInput minValue={0} maxValue={10} label="duration" label2="for" unit={periodDuration} />
            <RadioPeriodSelector periodUnit={periodDuration} setPeriodUnit={setPeriodDuration} />
            <RangeInput minValue={0} maxValue={100} label="ROE" unit="%" />
        </>
    );
};
