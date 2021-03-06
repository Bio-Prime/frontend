import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems, mainListItemsGUEST, secondaryListItems} from './listItems';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import routes from '../views/index'
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Sponzorji from "../components/Sponzorji";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {ExitToApp} from "@material-ui/icons";
import AuthService from "../services/AuthService";
import {withStyles} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from "@material-ui/core/Button";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: "1%"
    }
}));

function DashboardLayout({onClickDark}) {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderPageTitle = () => {
        return capitalize(location.pathname.substr(1).replace(/-/g, ' '));
    };

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    const onClickLogout = () => {
        AuthService.logout();
        history.push('login');
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {renderPageTitle()}
                    </Typography>

                    <Tooltip title={"Switch theme"}>
                        <IconButton color="inherit" aria-label="delete" className={classes.margin}
                                    onClick={onClickDark}>
                            <InvertColorsIcon/>
                        </IconButton>
                    </Tooltip>
                    <Typography component="h1" variant="h6" noWrap>
                        <Link href={"https://bioprimedocs.readthedocs.io/en/latest/"}>
                            <IconButton>
                                <HelpOutlineIcon style={{color: "white"}}/>
                            </IconButton>
                        </Link>
                    </Typography>
                    <Tooltip title={"Change password"}>
                        <Button onClick={() => history.push("/new-password")} color="inherit">
                            {AuthService.getUsername()}
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Logout"}>
                        <IconButton color="inherit" onClick={onClickLogout}>
                            <ExitToApp/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                {AuthService.getUserRole() === 'GUEST'
                    ? <List>{mainListItemsGUEST}</List>
                    : <List>{mainListItems}</List>
                }
                {AuthService.getUserRole() === 'ADMIN'
                    ? <div><Divider/><List>{secondaryListItems}</List></div>
                    : <div></div>
                }
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth={false} className={classes.container}>
                    <Switch>
                        {routes.map((page, key) => (
                            <Route path={page.path} component={page.component} key={key}/>
                        ))}

                        <Redirect from="/" to="/overview"/>
                    </Switch>
                    <Box pt={4}>
                        <Sponzorji/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default withStyles(useStyles)(DashboardLayout);
