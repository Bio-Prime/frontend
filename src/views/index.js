import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Admin from "./pages/Admin";
import AddTwo from "./pages/AddTwo";
import AddOne from "./pages/AddOne";
import EditPrimer from "./pages/EditPrimer";
import AddUser from "./pages/AddUser";
import PrimerDetails from "./pages/PrimerDetails";

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
    {
        name: 'PrimerDetails',
        path: '/primer-details',
        component: PrimerDetails,
    },
];

export default pageList;
