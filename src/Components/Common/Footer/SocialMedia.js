import React from "react";
import "../../../Styles/SocialMedia.css";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function SocialMedia() {
  return (
    <div className="socialmedia--container">
      <a href="https://www.whatsapp.com/" target="blank">
        <WhatsAppIcon className="socialmedia--logo" fontSize="large" />
      </a>
      <a
        href="https://instagram.com/cinema_time_g7?igshid=YmMyMTA2M2Y="
        target="blank"
      >
        <InstagramIcon className="socialmedia--logo" fontSize="large" />
      </a>
      <a href="https://twitter.com/CinemaTimeG7" target="blank">
        <TwitterIcon className="socialmedia--logo" fontSize="large" />
      </a>
    </div>
  );
}

export default SocialMedia;
