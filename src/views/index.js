import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import AddTwo from "./pages/AddTwo";
import AddOne from "./pages/AddOne";
import EditPrimer from "./pages/EditPrimer";
import AddUser from "./pages/AddUser";

const pageList = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
    },
    {
        name: 'Orders',
        path: '/orders',
        component: Orders,
    },
    {
        name: 'History',
        path: '/history',
        component: History,
    },
    {
        name: 'Analytics',
        path: '/analytics',
        component: Analytics,
    },
    {
        name: 'Admin',
        path: '/admin',
        component: Admin,
    },
    {
        name: 'AddTwo',
        path: '/add-two',
        component: AddTwo,
    },
    {
        name: 'AddOne',
        path: '/add-one',
        component: AddOne,
    },
    {
        name: 'EditPrimer',
        path: '/edit',
        component: EditPrimer,
    },
    {
        name: 'AddUser',
        path: '/add-user',
        component: AddUser,
    },
];

export default pageList;
