import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import App from "./App";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart/index";
import FullPizza from "./pages/FullPizza";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/pizza/:id",
        element: <FullPizza />,
      },
    ],
  },
]);

const rootElem = document.getElementById("root");
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
