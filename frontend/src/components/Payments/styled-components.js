import styled from "styled-components";
export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  background-color: #fefefe;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1.2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: bold;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1e7e34;
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  color: green;
`;

export const Error = styled.p`
  margin-top: 1rem;
  color: red;
`;
