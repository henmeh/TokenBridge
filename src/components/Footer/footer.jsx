import React from "react";
// Styles
import { Wrapper } from "./Footer.styles";
// Components
import Image from "../Image/image";
import moralis from "../../Images/moralis.png";

const Footer = () => (
  <Wrapper>
    Built with: 
    <Image className="moralisImage" image={moralis} height={25} />
  </Wrapper>
);

export default Footer;
