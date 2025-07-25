import React, { useState } from "react";
import Navbar from "../Navbar";
import { Container, WelcomeText } from "./styled-components";

const Home = () => {
  const [activeSection, setActiveSection] = useState("create-loan");

  return (
    <>
      <Navbar onSelect={setActiveSection} active={activeSection} />
      <Container>
        <WelcomeText>Welcome to Banking </WelcomeText>
      </Container>
    </>
  );
};

export default Home;
