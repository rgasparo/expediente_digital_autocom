import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from './router/index';
import { RouterProvider } from 'react-router-dom';
import { DocumentsProvider } from "./context/DocumentsProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DocumentsProvider>
        <RouterProvider router={router}/>
    </DocumentsProvider>
  </React.StrictMode>,
)