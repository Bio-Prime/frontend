import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from "react-router-dom";
import {Assessment, History, SupervisorAccount} from "@material-ui/icons";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/history">
            <ListItemIcon>
                <History />
            </ListItemIcon>
            <ListItemText primary="History" />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
            <ListItemIcon>
                <Assessment />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Admin Extra</ListSubheader>
        <ListItem button component={Link} to="/admin">
            <ListItemIcon>
                <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary="Manage users" />
        </ListItem>
    </div>
);
