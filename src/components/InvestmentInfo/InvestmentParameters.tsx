import React, {useContext, useState} from 'react';
import {CurrencyContext} from '../../views/InvestmentView';
import {RadioPeriodSelector} from '../Radio/RadioPeriodSelector';
import {RangeInput} from '../RangeInput/RangeInput';

interface Props {}

//TODO add conjugation for case 1 (ex. 1 year not years)
//TODO change useState radio implementation

export const InvestmentParameters = (props: Props) => {
    const currencyContext = useContext(CurrencyContext);
    const [periodFrequency, setPeriodFrequency] = useState('years');
    const [periodDuration, setPeriodDuration] = useState('years');

    return (
        <>
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
