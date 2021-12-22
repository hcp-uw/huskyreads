import React, { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import "./index.css";

export default function SettingsPage(username) {

  function changeMode() {
    let mode = localStorage.getItem("mode");
    if (mode) {
      if (mode === "light") {
        localStorage.setItem("mode", "dark");
      } else {
        localStorage.setItem("mode", "light");
      }
    } else {
      localStorage.setItem("mode", "light");
    }
  }

  useEffect(() => {
    let mode = localStorage.getItem("mode");
    if (!mode) {
      localStorage.setItem("mode", "light");
    }
  }, []);

  return(
    <div id="container">
      <h2>Settings</h2>
      <div className="mode-switch">
        <p>Dark mode</p>
        <Switch
          onChange={() => changeMode()}
        />
      </div>
    </div>
  );
}
