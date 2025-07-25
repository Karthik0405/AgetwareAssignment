import { useState } from "react";
import {
  Container,
  Input,
  Button,
  InfoBox,
  Table,
  PadContainr,
} from "./styled-components.js";
import Navbar from "../Navbar";
const Ledger = () => {
  const [loanId, setLoanId] = useState("");
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState("");

  const fetchLedger = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/loans/${loanId}/ledger`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLedger(null);
        return;
      }

      setLedger(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch ledger");
      setLedger(null);
    }
  };

  return (
    <Container>
      <Navbar active="Ledger" />
      <PadContainr>
        <h2>Loan Ledger</h2>
        <Input
          type="text"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
        />
        <Button onClick={fetchLedger}>Get Ledger</Button>
        {error && <InfoBox style={{ borderColor: "red" }}>{error}</InfoBox>}

        {ledger && (
          <>
            <InfoBox>
              <p>
                <strong>Loan ID:</strong> {ledger.loan_id}
              </p>
              <p>
                <strong>Customer ID:</strong> {ledger.customer_id}
              </p>
              <p>
                <strong>Principal:</strong> ₹{ledger.principal}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{ledger.total_amount}
              </p>
              <p>
                <strong>Monthly EMI:</strong> ₹{ledger.monthly_emi}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{ledger.amount_paid}
              </p>
              <p>
                <strong>Balance Amount:</strong> ₹{ledger.balance_amount}
              </p>
              <p>
                <strong>EMIs Left:</strong> {ledger.emis_left}
              </p>
            </InfoBox>

            <h3>Transactions</h3>
            <Table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {ledger.transactions.map((txn) => (
                  <tr key={txn.transaction_id}>
                    <td>{txn.transaction_id}</td>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.type}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </PadContainr>
    </Container>
  );
};

export default Ledger;
