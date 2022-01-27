import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--buttonColor, blue);
  width: 100px;
  //min-width: 200px;
  height: 30px;
  border-radius: 5px;
  color: var(--highLightColor, black);
  border: 0;
  font-size: ${(props) => props.fontSize};
  margin: 0 0 0 10px;
  transition: all 0.3s;
  //outline: none;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
