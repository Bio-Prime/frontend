import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";

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
];

export default pageList;
