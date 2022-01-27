import styled from "styled-components";

export const Wrapper = styled.tr`
  
  :hover {
      opacity: 0.8; 
  }
  
  td {
    color: var(--highLightColor, white);
    border-bottom: 1px solid black; 
    width: 100px;
    text-align: center;
    padding: 5px 0;  
  }

  .bridgingColumn{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
