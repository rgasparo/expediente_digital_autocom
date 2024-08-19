import { createBrowserRouter } from "react-router-dom";
import Documents from '../pages/Documents';
import NotFound from '../pages/NotFound';

//path:'/:expediente/:token/:src',

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Documents />
    },
    {
        path:'/*',
        element: <NotFound />
    },
    {
        path:'/notfound',
        element: <NotFound />
    },
 
]);