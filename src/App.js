import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LoginLayout from "./layouts/LoginLayout";
import PrivateRoute from "./components/PrivateRoute";

const palette = {
  type: "dark",
  primary: {
    main: "#876E9B",
  },
  secondary: {
    main: '#FFD65D',
  },
  bgDialog: '#303030',
};

function App() {
  // We keep the theme in app state
  const [theme, setTheme] = useState({
    palette: palette,
  });

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    let newPalette = {
      palette: palette,
    };

    // set type
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    newPalette.palette.type = newPaletteType;

    // set dialog background
    let newPaletteBgDialog = theme.palette.type === "light" ? '#E3E3E3' : "#303030";
    newPalette.palette.bgDialog = newPaletteBgDialog;

    setTheme(newPalette);
  };

  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginLayout />
          </Route>
          <PrivateRoute path="/">
            <DashboardLayout onClickDark={toggleDarkTheme} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
