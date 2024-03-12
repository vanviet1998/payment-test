import React from 'react';
import {
    createBrowserRouter
} from "react-router-dom";
import Default from './pages/Default';
import DetailPayment from './pages/DetailPayment';
import HomePage from './pages/HomePage';
import OrderDetail from './pages/OrderDetails';
import Payment from './pages/Payment';

const MyRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "payment",
        element: <Payment />,
    },
    {
        path: "detail",
        element: <DetailPayment />,
    },
    {
        path: "order/:id",
        element: <OrderDetail />,
    },
]);

export default MyRoutes;