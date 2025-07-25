import styled from "styled-components";

export const Container = styled.div``;

export const Input = styled.input`
  padding: 0.5rem;
  margin-right: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #0077cc;
  color: white;
  border: none;
  cursor: pointer;
`;

export const InfoBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-left: 4px solid #0077cc;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }
  th {
    background-color: #0077cc;
    color: white;
  }
`;

export const PadContainr = styled.div`
  padding: 30px;
`;
