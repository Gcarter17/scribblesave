import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

const OnOffBtn = ({ darkMode }) => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(!checked);
  };

  const GlobalStyles = createGlobalStyle`
  body {
      background-color: rgba(85, 85, 85, 1.0)
  }
  .navbar {
      background-color: rgba(55, 66, 145, 1.0);
      border-bottom: 1px solid rgba(55, 66, 145, 1.0);
  }
`;

  return (
    <>
      {darkMode && checked && <GlobalStyles />}
      <div className="onOffButton">
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <div className={darkMode ? "knobs darkModeBtn" : "knobs"}></div>
        <div className="layer"></div>
      </div>
    </>
  );
};

export default OnOffBtn;
