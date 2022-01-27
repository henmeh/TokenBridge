import React from "react";
import { Wrapper } from "./Button.styles";
import PropTypes from "prop-types";

const NormalButton = ({ text, onClick, fontSize }) => (
  <Wrapper type="button" onClick={onClick} fontSize={fontSize}>
    {text}
  </Wrapper>
);

NormalButton.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func,
};

export default NormalButton;
