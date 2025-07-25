// src/Navbar/styled-components.js
import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: #f2f2f2;
`;

export const NavItem = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${(props) => (props.active ? "#2e86de" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#2e86de")};
  border: 2px solid #2e86de;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2e86de;
    color: #ffffff;
  }
`;
