import Navbar from "../Navbar";
import { Container, Input, Button, Card, DivConter } from "./styled-components";
import { useState } from "react";
const Overview = () => {
  const [customerId, setCustomerId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchOverview = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/customers/${customerId}/overview`
      );
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Error fetching overview");
        setData(null);
      } else {
        setData(json);
        setError("");
      }
    } catch (err) {
      setError("Network error");
      setData(null);
    }
  };

  return (
    <DivConter>
      <Navbar />
      <Container>
        <h2>Customer Loan Overview</h2>
        <Input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <Button onClick={fetchOverview}>Get Overview</Button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        {data && (
          <>
            <p>
              <strong>Customer ID:</strong> {data.customer_id}
            </p>
            <p>
              <strong>Total Loans:</strong> {data.total_loans}
            </p>

            {data.loans.map((loan, index) => (
              <Card key={loan.loan_id}>
                <h4>
                  Loan {index + 1} (ID: {loan.loan_id})
                </h4>
                <p>
                  <strong>Principal:</strong> ₹{loan.principal}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{loan.total_amount}
                </p>
                <p>
                  <strong>Total Interest:</strong> ₹{loan.total_interest}
                </p>
                <p>
                  <strong>Monthly EMI:</strong> ₹{loan.emi_amount}
                </p>
                <p>
                  <strong>Amount Paid:</strong> ₹{loan.amount_paid}
                </p>
                <p>
                  <strong>EMIs Left:</strong> {loan.emis_left}
                </p>
              </Card>
            ))}
          </>
        )}
      </Container>
    </DivConter>
  );
};

export default Overview;
