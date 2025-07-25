import React from "react";
import { NavContainer, NavItem } from "./styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <NavItem
        onClick={() => navigate("/create-loan")}
        active={getActive("/create-loan")}
      >
        Create Loan
      </NavItem>
      <NavItem
        onClick={() => navigate("/payments")}
        active={getActive("/payments")}
      >
        Payments
      </NavItem>
      <NavItem
        onClick={() => navigate("/ledger")}
        active={getActive("/ledger")}
      >
        Ledger
      </NavItem>
      <NavItem
        onClick={() => navigate("/overview")}
        active={getActive("/overview")}
      >
        Overview
      </NavItem>
    </NavContainer>
  );
};

export default Navbar;
