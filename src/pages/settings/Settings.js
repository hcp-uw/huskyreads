import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

export default function SettingsPage() {
  
  // create some checked function that accesses the endpoint to see if the site
  // dark mode or not

  // styling
  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  

  return(
    <div id="container">
      <p>Settings page</p>
      <p>Light Mode left, Dark mode right</p>
      <PurpleSwitch/>
    </div>
  );
}
