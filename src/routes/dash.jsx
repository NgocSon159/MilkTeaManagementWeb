import Dashboard from 'views/Dashboard/Dashboard.jsx';

import ReadAllUser from 'views/User/ReadAllUser.jsx';
import CreateUser from 'views/User/CreateUser.jsx';
import ReadOneUser from 'views/User/ReadOneUser.jsx';

import ReadAllOrder from 'views/Order/ReadAllOrder.jsx';
import CreateOneOrder from 'views/Order/CreateOneOrder.jsx';
import BaristaReadAll from 'views/Order/BaristaReadAll.jsx';
import CashierReadAll from 'views/Order/CashierReadAll.jsx';


import UserPage from 'views/Pages/UserPage.jsx';

import pagesRoutes from './pages.jsx';

import CreateCustomer from 'views/Customer/CreateCustomer.jsx';
import ReadAllCustomer from 'views/Customer/ReadAllCustomer.jsx';
import ReadOneCustomer from 'views/Customer/ReadOneCustomer.jsx';
import CreateEmployee from 'views/Employee/CreateEmployee.jsx';
import ReadAllEmployee from 'views/Employee/ReadAllEmployee.jsx';
import ReadOneEmployee from 'views/Employee/ReadOneEmployee.jsx';

import CreateCategory from'views/Category/CreateCategory.jsx';
import ReadAllCategory from'views/Category/ReadAllCategory.jsx';
import ReadOneCategory from'views/Category/ReadOneCategory.jsx';

import CreateFood from'views/Food/CreateFood.jsx';
import ReadAllFood from'views/Food/ReadAllFood.jsx';
import ReadOneFood from'views/Food/ReadOneFood.jsx';

import CreateMenu from'views/Menu/CreateMenu.jsx';
import ReadAllMenu from'views/Menu/ReadAllMenu.jsx';
import ReadOneMenu from'views/Menu/ReadOneMenu.jsx';

var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { collapse: true, path: "/Order", name: "Order", state: "openOrder", icon: "pe-7s-plugin", views:[
        { path: "/Order/ReadAll", name: "List Order", mini: "B", component: ReadAllOrder },
        { path: "/Order/CreateOneOrder", name: "Create Order", mini: "B", component: CreateOneOrder },
        { path: "/Order/BaristaReadAll", name: "Barista", mini: "B", component: BaristaReadAll },
        { path: "/Order/CashierReadAll", name: "Cashier", mini: "B", component: CashierReadAll }]
        
    },
    { collapse: true, path: "/User", name: "User", state: "openUser", icon: "pe-7s-plugin", views:[
        { path: "/User/ReadAll", name: "List User", mini: "B", component: ReadAllUser },
        { path: "/User/Create", name: "Create User", mini: "B", component: CreateUser },
        { path: "/User/ReadOneUser", name: "Read One User", mini: "B", component: ReadOneUser }]
    
    },
    { collapse: true, path: "/customer", name: "Customer", state: "openCustomer", icon: "pe-7s-star", views:
    [
        { path: "/customer/ReadAllCustomer", name: "List Customer", mini: "RAC", component: ReadAllCustomer },
        { path: "/customer/ReadOneCustomer", name: "Read One Customer", mini: "ROC", component: ReadOneCustomer },
        { path: "/customer/CreateCustomer", name: "Create Customer", mini: "CC", component: CreateCustomer }
    ]
    },
    { collapse: true, path: "/employee", name: "Employee", state: "openEmployee", icon: "pe-7s-id", views:
    [
        { path: "/employee/ReadAllEmployee", name: "List Employee", mini: "RAE", component: ReadAllEmployee },
        { path: "/employee/ReadOneEmployee", name: "Read One Employee", mini: "ROE", component: ReadOneEmployee },
        { path: "/employee/CreateEmployee", name: "Create Employee", mini: "CE", component: CreateEmployee }
    ]
    },

    { collapse: true, path: "/Category", name: "Category", state: "openCategory", icon: "pe-7s-note2", views:
    [
        { path: "/Category/ReadAllCategory", name: "List Category", mini: "RA", component: ReadAllCategory },
        { path: "/Category/ReadOneCategory", name: "Read One Category", mini: "RO", component: ReadOneCategory },
        { path: "/Category/CreateCategory", name: "Create Category", mini: "C", component: CreateCategory }
    ]
    },
    { collapse: true, path: "/Food", name: "Food", state: "openFood", icon: "pe-7s-note2", views:
    [
        { path: "/Food/ReadAllFood", name: "List Food", mini: "RA", component: ReadAllFood },
        { path: "/Food/ReadOneFood", name: "Read One Food", mini: "RO", component: ReadOneFood },
        { path: "/Food/CreateFood", name: "Create Food", mini: "C", component: CreateFood }
    ]
    },
    { collapse: true, path: "/Menu", name: "Menu", state: "openMenu", icon: "pe-7s-note2", views:
    [
        { path: "/Menu/ReadAllMenu", name: "List Menu", mini: "RA", component: ReadAllMenu },
        { path: "/Menu/ReadOneMenu", name: "Read One Menu", mini: "RO", component: ReadOneMenu },
        { path: "/Menu/CreateMenu", name: "Create Menu", mini: "C", component: CreateMenu }
    ]
    }
    // { redirect: true, path: "/", pathTo: "/pages/login-page", name: "Login" }
];
export default dashRoutes;
