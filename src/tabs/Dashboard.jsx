import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";
import ExpenseNIncome from "../components/ExpenseNIncome";
import MonthlyBudget from "../components/MonthlyBudget";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import CurrencyConverter from "../components/CurrencyConverter";
import RecentTransactions from "../components/RecentTransactions";
const Dashboard = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">Dashboard</h1>
            <section className="card-container">
              <ExpenseNIncome />
              <MonthlyBudget />
              <ExpenseBreakdown />
              <CurrencyConverter />
              <RecentTransactions />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
