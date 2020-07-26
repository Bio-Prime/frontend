import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import {History, SupervisorAccount} from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';

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

        <ListItem button component={Link} to="/add-one-general">
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add primer/probe" />
        </ListItem>
    </div>
);

export const mainListItemsGUEST = (
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
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button component={Link} to="/admin">
            <ListItemIcon>
                <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary="Manage users" />
        </ListItem>
    </div>
);
