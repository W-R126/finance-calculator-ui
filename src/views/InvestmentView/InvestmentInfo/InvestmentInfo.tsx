import {Box, CircularProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {InvestmentParameters, InvestmentResultTypes} from '../../../api/investmentsAPI.types';
import {FrequencySelector} from '../../../components/FrequencySelector/FrequencySelector';
import {InvestmentResults} from '../../../components/InvestmentResults/InvestmentResults';
import {RangeInput} from '../../../components/RangeInput/RangeInput';
import {Separator} from '../../../components/Separator/Separator';
import {currencyUnit} from '../InvestmentView.constants';
import {calculatePredictedChange} from './InvestmentInfo.helpers';

interface Props {
    parameters: InvestmentParameters;
    setParameters: React.Dispatch<React.SetStateAction<InvestmentParameters>>;
    results?: InvestmentResultTypes | null;
}

export const InvestmentInfo: React.FC<Props> = ({parameters, setParameters, results}) => {
    const currency = currencyUnit;

    const setInitialDeposit = (initialDepositValue: number) => {
        setParameters({
            ...parameters,
            initialDepositValue,
        });
    };

    const setSystematicDeposit = (systematicDepositValue: number) => {
        setParameters({
            ...parameters,
            systematicDepositValue,
        });
    };

    const setFrequency = (frequencyInYears: number) => {
        setParameters({
            ...parameters,
            frequencyInYears,
        });
    };

    const setDuration = (durationInYears: number) => {
        setParameters({
            ...parameters,
            durationInYears,
        });
    };

    const setReturnOfInvestment = (returnOfInvestment: number) => {
        setParameters({
            ...parameters,
            returnOfInvestment,
        });
    };

    const setRisk = (risk: number) => {
        setParameters({
            ...parameters,
            risk,
        });
    };

    const onRiskChange = (value: number) => setRisk(value / 100);

    return (
        <>
            {results ? (
                <>
                    <Separator text="Results" />
                    <InvestmentResults
                        totalChangePercent={results.rateOfReturnPercentage}
                        totalChange={results.rateOfReturnValue}
                        totalRiskPercentage={parameters.risk}
                        predictedChange={calculatePredictedChange(
                            results.initialDepositValue,
                            results.systematicDepositValue,
                            results.durationInYears,
                            results.frequencyInYears,
                            results.rateOfReturnValue,
                        )}
                    />
                </>
            ) : (
                <Box textAlign="center" height="137px">
                    <Separator text="Results" />
                    <CircularProgress />
                </Box>
            )}
            <Separator text="Parameters" />
            <RangeInput
                minValue={1}
                maxValue={5000}
                label="initial deposit"
                unit={currency}
                value={parameters.initialDepositValue}
                onChange={setInitialDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={250}
                label="systematic deposit"
                unit={currency}
                value={parameters.systematicDepositValue}
                onChange={setSystematicDeposit}
            />
            <FrequencySelector value={parameters.frequencyInYears} onChange={setFrequency} label="frequency" />
            <FrequencySelector value={parameters.durationInYears} onChange={setDuration} label="duration" />
            <RangeInput
                minValue={0}
                maxValue={50}
                label="ROI"
                unit="%"
                value={parameters.returnOfInvestment}
                onChange={setReturnOfInvestment}
            />
            <RangeInput
                minValue={0}
                maxValue={100}
                label="Risk factor"
                unit="%"
                value={Math.round(parameters.risk * 100)}
                onChange={onRiskChange}
            />
        </>
    );
};
