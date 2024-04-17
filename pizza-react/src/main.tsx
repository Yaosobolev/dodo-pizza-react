import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import App from "./App";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";

const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div>Загрузка страницы ошибки....</div>}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Загрузка корзины....</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/pizza/:id",
        element: (
          <Suspense fallback={<div>Загрузка страницы с пиццей....</div>}>
            <FullPizza />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
