import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-x: auto;
  height: 550px;
  box-shadow: 0 4px 8px 0 black;
  background-color: var(--primaryColor, darkGray);
  padding: 0 5px;
  margin-bottom: 10px;

  thead {
    color: var(--accentColor, white);
    width: 100px;
    text-align: center;
    border-bottom: 1px solid gray; 
    margin: 0 auto;
  }

  table {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-collapse: collapse;
  }
`;