import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './elements/scss/styles.scss';
import LoginLayout from "./layouts/LoginLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home' component={DashboardLayout} />
        <Route path='/login' component={LoginLayout} />
      </Switch>
    </BrowserRouter>
  );
}
