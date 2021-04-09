import React, { useState } from 'react'

const Form = () => {
    const [userValues, setUserValues] = useState({ name: '', amount: '', date: '', interest: '' });
    const [results, setResults] = useState({ monthlyPayment: '', totalInterest: '', isResult: false });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: { target: { name: any; value: any; }; }) =>
        setUserValues({ ...userValues, [e.target.name]: e.target.value });

    const handleSubmitValues = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const calculateResults = ({ amount, date, interest }) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100 / 12;
        const calculatedPayments = Number(date) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);

            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: monthlyPaymentCalculated,
                totalInterest: totalInterestCalculated,
                isResult: true,
            });
        }
        return;
    };

    return (
        <div>
            <h1>Ikmēneša tēriņi</h1>
            <form onSubmit={handleSubmitValues}>
                <label htmlFor="">Saistības nosaukums</label>
                <input type="text" name="name" value={userValues.name} onChange={handleInputChange} />
                <label htmlFor="">Aizdevuma pamatsumma</label>
                <input type="text" name="amount" value={userValues.amount} onChange={handleInputChange} />
                <label htmlFor="">Aizdevuma termiņš</label>
                <input type="text" name="date" value={userValues.date} onChange={handleInputChange} />
                <label htmlFor="">Aizdevuma procenti mēnesī no atlikušās pamatsummas</label>
                <input type="text" name="interest" value={userValues.interest} onChange={handleInputChange} />
                <input type="submit" />
            </form>
            <div>
                <h1>rezultati</h1>
                <div>
                    <h4>
                        Loan amount: ${userValues.amount} <br />
                        Interest:{userValues.interest}% <br />
                        Years to repay: {userValues.date}
                    </h4>
                    <div>
                        <label>Monthly Payment:</label>
                        <input type='text' value={results.monthlyPayment} disabled />
                    </div>
                    <div>
                        <label>Total Interest:</label>
                        <input type='text' value={results.totalInterest} disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;