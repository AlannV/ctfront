import React from "react";

import { NavLink } from "react-router-dom";

import SocialMedia from "./FooterComponents/SocialMedia";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer--container">
      <SocialMedia />
      <div className="footer--links--container">
        <div className="footer--links">
          <NavLink to={"/terms"}>Terms {"&"} Conditions</NavLink>
        </div>
        <div className="footer--links">
          <NavLink to={"/about"}>About Us</NavLink>
        </div>
        <div className="footer--links">
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
      </div>

      <div className="copyright">
        <p> © Copyright 2022 M A N S E L D web design </p>
      </div>
    </div>
  );
}

export default Footer;
