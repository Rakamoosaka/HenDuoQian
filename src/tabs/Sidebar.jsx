import {
  Home,
  DollarSign,
  PieChart,
  RefreshCcw,
  Clock,
  Settings,
  Menu,
} from "lucide-react";
import "../styles/global.scss";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <section className="sidebar">
      <h1 className="logo">HenDuoQian</h1>

      <ul className="all-tabs">
        <li>
          <Link to={"/"}>
            <Home size={24} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to={"/transactions"}>
            <DollarSign size={24} />
            Transactions
          </Link>
        </li>
        <li>
          <Link to={"/budget"}>
            <PieChart size={24} />
            Budget
          </Link>
        </li>
        <li>
          <Link to={"/currency"}>
            <RefreshCcw size={24} />
            Currency
          </Link>
        </li>
        <li>
          <Link to={"/history"}>
            <Clock size={24} />
            History
          </Link>
        </li>
        <li>
          <Link to={"/settings"}>
            <Settings size={24} />
            Settings
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
