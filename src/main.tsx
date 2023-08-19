import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SecondPage from "./Components/SecondPage";
import "./index.css";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/second", 
    element: <SecondPage />, 
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
