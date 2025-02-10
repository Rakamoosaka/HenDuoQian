import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";
import BudgetSummary from "../components/BudgetSummary";
import ManageBudget from "../components/ManageBudget";
const Budget = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">Budget</h1>
            <section className="card-container">
              <BudgetSummary />
              <ManageBudget />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Budget;
