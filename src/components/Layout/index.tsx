import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background: linear-gradient(to bottom, #b91eda, #a020f0, #8133f6, #6741f7);
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

/**
 * A reusable layout component that wraps its children in a styled background and container.
 *
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @return {JSX.Element} The styled layout component.
 */
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
};

export default Layout;
