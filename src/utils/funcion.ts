import React, { FC } from 'react';

export default calculateResults = ({ amount, date, interest, setResults }: any) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100 / 12;
        const calculatedPayments = Number(date) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);

            setResults({
                monthlyPayment: monthlyPaymentCalculated,
                totalInterest: totalInterestCalculated,
                isResult: true,
            });
        }
        return;

    };