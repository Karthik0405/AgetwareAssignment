import React from "react";
import Navbar from "../Navbar";
import { useState } from "react";
import {
  FormWrapper,
  Input,
  Label,
  Button,
  Message,
  Error,
} from "./styled-components.js";
const Payments = () => {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [emisLeft, setEmisLeft] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!loanId || !amount || !paymentType) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/loans/${loanId}/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            payment_type: paymentType,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment failed");
        return;
      }

      setMessage(data.message);
      setRemainingBalance(data.remaining_balance);
      setEmisLeft(data.emis_left);

      setLoanId("");
      setAmount("");
      setPaymentType("");
    } catch (err) {
      console.error(err);
      setMessage("");
      setRemainingBalance(null);
      setEmisLeft(null);
      setError("Something went wrong while processing the payment");
    }
  };

  return (
    <>
      <Navbar active="payments" />
      <FormWrapper>
        <h2>Make a Payment</h2>
        <form onSubmit={handleSubmit}>
          <Label>Loan ID</Label>
          <Input
            type="text"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
          />

          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Label>Payment Type (e.g., UPI, Bank Transfer)</Label>
          <Input
            type="text"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            required
          />

          <Button type="submit">Submit Payment</Button>
        </form>

        {message && (
          <>
            <Message>{message}</Message>
            <Message>Remaining Balance: ₹{remainingBalance}</Message>
            <Message>EMIs Left: {emisLeft}</Message>
          </>
        )}
        {error && <Error>{error}</Error>}
      </FormWrapper>
    </>
  );
};

export default Payments;
