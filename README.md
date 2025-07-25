Bank Lending System
A full-stack web application that allows banks or financial institutions to manage loans, track payments, view ledgers, and get customer loan overviews.

Tech Stack
  Frontend:
    React.js
    React Router DOM
    Styled Components
    Fetch API
  Backend:
    Node.js
    Express.js
  Database:
    SQLite (or PostgreSQL)
1. Create a Loan
  API: POST /api/v1/loans
  Input:
    customer_id
    loan_amount
    loan_period_years
    interest_rate_yearly
  Backend calculates:
    interest
    total payable
    monthly EMI
    loan status: ACTIVE
2. Make a Payment
   API: POST /api/v1/loans/:loan_id/payments
   Input:
     amount
     payment_type (e.g., CASH, ONLINE)
   Backend:
     Adds payment record
   Updates EMIs left
   Marks loan CLOSED if paid fully
3. View Loan Ledger
   API: GET /api/v1/loans/:loan_id/ledger
   Shows:
    loan info
    payment history
    remaining balance
    EMIs left
4. Customer Overview
   API: GET /api/v1/customers/:customer_id/overview
   Shows:
    Total loans for the customer
    Details for each loan:
    principal
    total interest
    EMI
    paid amount
    EMIs left
API Endpoints:
1. POST /api/v1/loans
   Create a new loan.
2. POST /api/v1/loans/:loan_id/payments
   Make a payment against a loan.
3. GET /api/v1/loans/:loan_id/ledger
   Get full ledger and transactions for a loan.
4. GET /api/v1/customers/:customer_id/overview
   Fetch all loans and stats for a customer.

