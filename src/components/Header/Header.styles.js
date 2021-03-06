import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--primaryColor, darkGray);
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    color: var(--highLightColor, white);
  }
`;
