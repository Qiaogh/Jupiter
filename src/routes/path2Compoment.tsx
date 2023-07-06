import * as React from "react";
import Dashboard from "../pages/admin/Dashboard";
import Login from '../pages/Login';
import Register from '../pages/Register';
import User from '../pages/user/user_management';

const path2components = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/user/user-mange',
        component: User
    }
]

export default path2components;
