import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  FormWrapper,
  Input,
  Label,
  Button,
  Message,
} from "./styled-components.js";
const CreateLoan = () => {
  const [formData, setFormData] = useState({
    customer_id: "",
    loan_amount: "",
    loan_period_years: "",
    interest_rate_yearly: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Loan created successfully!");
        setFormData({
          customer_id: "",
          loan_amount: "",
          loan_period_years: "",
          interest_rate_yearly: "",
        });
      } else {
        const errData = await res.json();
        setMessage(`Error: ${errData.error}`);
      }
    } catch (err) {
      setMessage("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar active="create-loan" />
      <FormWrapper>
        <h2>Create Loan</h2>
        <form onSubmit={handleSubmit}>
          <Label>Customer ID</Label>
          <Input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          />

          <Label>Loan Amount</Label>
          <Input
            type="number"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            required
          />

          <Label>Loan Period (Years)</Label>
          <Input
            type="number"
            name="loan_period_years"
            value={formData.loan_period_years}
            onChange={handleChange}
            required
          />

          <Label>Interest Rate (Yearly %)</Label>
          <Input
            type="number"
            name="interest_rate_yearly"
            value={formData.interest_rate_yearly}
            onChange={handleChange}
            required
          />

          <Button type="submit">Create Loan</Button>
        </form>

        {message && <Message>{message}</Message>}
      </FormWrapper>
    </>
  );
};

export default CreateLoan;
