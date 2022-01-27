import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 15px;
  padding: 5px 5px;
  align-items: center;
  width: 100%;

  .data {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-column-gap: 15px;
    padding: 5px 5px;
    align-items: center;
    width: 100%;
  }

  .transactions {
    display: flex;
    flex-direction: column;
  }

  .chainButtons {
    align-self: center;
    display: flex;
    width: 550px;
  }

  h2 {
    color: var(--highLightColor);
  }

  .item1 {
    margin-top: 45px;
  }

  @media (max-width: 1100px) {
    .data {
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: 15px;
      padding: 5px 5px;
      align-items: center;
      width: 100%;
    }
  }
`;

export const Wrapper2 = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 15px;
  padding: 5px 5px;
  align-items: center;
  justify-content: center;
  width: 100%;

  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450px;
    width: 550px;
    box-shadow: 0 4px 8px 0 black;
    background-color: var(--primaryColor);
    padding: 0 5px;
  }
`;
