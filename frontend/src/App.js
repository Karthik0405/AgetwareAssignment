import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateLoan from "./components/CreateLoan";
import Payments from "./components/Payments";
import Ledger from "./components/Ledger";
import Overview from "./components/Overview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/ledger" element={<Ledger />} />
      </Routes>
    </Router>
  );
}

export default App;
