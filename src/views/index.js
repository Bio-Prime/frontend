import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

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
];

export default pageList;
