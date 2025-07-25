const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "banking.db");
let db = null;

const initializeDatabase = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

initializeDatabase();

app.post("/api/v1/loans", async (req, res) => {
  try {
    const {
      customer_id,
      loan_amount,
      loan_period_years,
      interest_rate_yearly,
    } = req.body;
    console.log(req.body);
    if (
      !customer_id ||
      !loan_amount ||
      !loan_period_years ||
      !interest_rate_yearly
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interest =
      loan_amount * loan_period_years * (interest_rate_yearly / 100);
    const total = loan_amount + interest;
    const emi = total / (loan_period_years * 12);
    const loan_id = uuidv4();

    await db.run(
      `INSERT INTO loans (loan_id, customer_id, principal_amount, total_amount, interest_rate, loan_period_years, monthly_emi, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
      [
        loan_id,
        customer_id,
        loan_amount,
        total,
        interest_rate_yearly,
        loan_period_years,
        emi,
      ]
    );
    res.send("Updated successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/v1/loans/:loan_id/payments", async (req, res) => {
  const { loan_id } = req.params;
  const { amount, payment_type } = req.body;

  if (!amount || !payment_type) {
    return res.status(400).json({ error: "Missing amount or payment_type" });
  }

  try {
    const loan = await db.get("SELECT * FROM loans WHERE loan_id = ?", loan_id);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    const payments = await db.get(
      "SELECT COALESCE(SUM(amount), 0) AS total_paid FROM payments WHERE loan_id = ?",
      loan_id
    );

    const total_paid = payments.total_paid + amount;
    const remaining_balance = loan.total_amount - total_paid;
    const emis_left = Math.ceil(remaining_balance / loan.monthly_emi);

    const payment_id = uuidv4();
    const payment_date = new Date().toISOString();

    await db.run(
      `INSERT INTO payments (payment_id, loan_id, amount, payment_type, payment_date)
       VALUES (?, ?, ?, ?, ?)`,
      [payment_id, loan_id, amount, payment_type, payment_date]
    );
    if (remaining_balance <= 0) {
      await db.run(
        `UPDATE loans SET status = 'CLOSED' WHERE loan_id = ?`,
        loan_id
      );
    }

    res.status(200).json({
      payment_id,
      loan_id,
      message: "Payment recorded successfully.",
      remaining_balance: Math.max(remaining_balance, 0),
      emis_left: Math.max(emis_left, 0),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/loans/:loan_id/ledger", async (req, res) => {
  const { loan_id } = req.params;

  try {
    const loan = await db.get(`SELECT * FROM loans WHERE loan_id = ?`, [
      loan_id,
    ]);

    if (!loan) return res.status(404).json({ error: "Loan not found" });

    const payments = await db.all(
      `SELECT * FROM payments WHERE loan_id = ? ORDER BY payment_date ASC`,
      [loan_id]
    );

    const amount_paid = payments.reduce((sum, txn) => sum + txn.amount, 0);
    const balance_amount = loan.total_amount - amount_paid;
    const emis_left = Math.ceil(balance_amount / loan.monthly_emi);

    return res.status(200).json({
      loan_id: loan.loan_id,
      customer_id: loan.customer_id,
      principal: loan.principal_amount,
      total_amount: loan.total_amount,
      monthly_emi: loan.monthly_emi,
      amount_paid,
      balance_amount,
      emis_left,
      transactions: payments.map((txn) => ({
        transaction_id: txn.payment_id,
        date: txn.payment_date,
        amount: txn.amount,
        type: txn.payment_type,
      })),
    });
  } catch (err) {
    console.error("Ledger error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}); 

app.get("/api/v1/customers/:customer_id/overview", async (req, res) => {
  const { customer_id } = req.params;

  try {
    const loans = await db.all(`SELECT * FROM loans WHERE customer_id = ?`, [
      customer_id,
    ]);

    if (loans.length === 0)
      return res
        .status(404)
        .json({ error: "No loans found for this customer" });

    const overview = [];

    for (const loan of loans) {
      const transactions = await db.all(
        `SELECT * FROM payments WHERE loan_id = ?`,
        [loan.loan_id]
      );

      const amount_paid = transactions.reduce(
        (sum, txn) => sum + txn.amount,
        0
      );
      const balance_amount = loan.total_amount - amount_paid;
      const emis_left = Math.ceil(balance_amount / loan.monthly_emi);

      overview.push({
        loan_id: loan.loan_id,
        principal: loan.principal_amount,
        total_amount: loan.total_amount,
        total_interest: loan.total_amount - loan.principal_amount,
        emi_amount: loan.monthly_emi,
        amount_paid,
        emis_left,
      });
    }

    return res.status(200).json({
      customer_id,
      total_loans: overview.length,
      loans: overview,
    });
  } catch (err) {
    console.error("Overview error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = app;
