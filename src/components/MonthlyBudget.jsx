import "../styles/components.scss";
import ProgressBar from "./ui/ProgressBar";

const MonthlyBudget = () => {
  return (
    <>
      <div className="content-card">
        <h1>Monthly Budget</h1>
        <ProgressBar progress={70} />
        <div className="expense-income-span">
          <div>
            <p className="spent-remaining">Spent</p>
            <span className="net-balance-value">$1,532</span>
          </div>
          <div>
            <p className="spent-remaining push-right">Remaining</p>
            <span className="net-balance-value">$123,123</span>
          </div>
        </div>
        <p className="net-balance">1,532 of $5000 budget</p>
      </div>
    </>
  );
};

export default MonthlyBudget;
