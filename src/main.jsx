import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx'
import './index.css'
// import Root from './routes/root.jsx';
import NewProjectForm from './components/NewProjectForm.jsx';
import HomePage from './components/main/HomePage.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "home",
//         element: <HomePage />,
//       },
//       {
//         path: "new",
//         element: <NewProjectForm/>,
//       },
//     ],
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>,
)
