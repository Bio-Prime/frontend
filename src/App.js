import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={DashboardLayout} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
