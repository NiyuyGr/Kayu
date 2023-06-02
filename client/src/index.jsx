import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from "./routes/Login";
import Signin from './routes/Signin';
import Home from './routes/Home';
import CRUDU from './routes/CRUDU';
import CRUDL from './routes/CRUDL'
import OpAdmin from './routes/OpAdmin';
import UpdateU from './routes/UpdateU';
import CreateU from './routes/CreateU';
import ViewU from './routes/ViewU'
const router=createBrowserRouter([
    {
        path:'/',
        element: <Home/>, //Esto va a ser Landing en ves de home
    },
    {
        path:'/Login',
        element: <Login/>,
    },
    {
        path:'/Signin',
        element: <Signin/>,
    },
    {
        path:'/OpAdmin',
        element: <OpAdmin/>,
        
    },
    {
        path:'/OpAdmin/CRUDU',
        element: <CRUDU/>,
    },
    {
        path:'/OpAdmin/CRUDL',
        element: <CRUDL/>,
    },
    {
        path:'/OpAdmin/CRUDU/UpdateU/:nameUser',
        element: <UpdateU/>,
    },
    {
        path:'/OpAdmin/CRUDU/CreateU',
        element: <CreateU/>,
    },
    {
        path:'/OpAdmin/CRUDU/ViewU/:nameUser',
        element: <ViewU/>,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <RouterProvider router={router}/>
    
);

