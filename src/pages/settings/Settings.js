import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import "./index.css";

export default function SettingsPage() {

  // create some checked function that accesses the endpoint to see if the site
  // dark mode or not

  // styling
  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[700],
      },
      '&$checked + $track': {
        backgroundColor: purple[700],
      },
    },
    checked: {},
    track: {},
  })(Switch);


  return(
    <div id="container">
      <h2>Settings</h2>
      <div className="mode-switch">
        <p>Dark mode</p>
        <PurpleSwitch/>
      </div>
    </div>
  );
}
