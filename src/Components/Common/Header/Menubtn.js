import React from "react";

import MenuIcon from "@mui/icons-material/Menu";

import "../../../Styles/Menubtn.css";

const Toggle = (props) => {
  return (
    <div id="toggle" className={props.className}>
      <button onClick={props.click}>
        <MenuIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Toggle;
