import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const palette = {
    type: "light",
    primary: {
        main: '#26A69A',
    }
};

function App() {

    // We keep the theme in app state
    const [theme, setTheme] = useState({
        palette: palette
    });

    // we change the palette type of the theme in state
    const toggleDarkTheme = () => {
        let newPalette = {
            palette: palette
        };
        let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
        newPalette.palette.type = newPaletteType;
        setTheme(newPalette);
    };

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme(theme);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={() => <DashboardLayout onClickDark={toggleDarkTheme} />}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
