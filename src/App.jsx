import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Budget from "./tabs/Budget";
import Currency from "./tabs/Currency";
import Dashboard from "./tabs/Dashboard";
import History from "./tabs/History";
import Settings from "./tabs/Settings";
import Transactions from "./tabs/Transactions";
import "./styles/global.scss";
const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/transactions", element: <Transactions /> },
  { path: "/budget", element: <Budget /> },
  { path: "/currency", element: <Currency /> },
  { path: "/history", element: <History /> },
  { path: "settings", element: <Settings /> },
]);

function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
