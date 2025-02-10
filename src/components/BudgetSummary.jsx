import "../styles/components.scss";
import ProgressBar from "./smaller components/ProgressBar";
const BudgetSummary = () => {
  return (
    <>
      <div className="content-card">
        <h1>Budget Summary</h1>
        <h3>Overall budget</h3>
        <ProgressBar progress={35} large={true} />
        <div className="expense-income-span">
          <p className="overall-expenditure">Spent: $0.0</p>
          <p className="overall-expenditure">Budget: $0.0</p>
        </div>
        <h3>Category Breakdown</h3>
        <div className="expense-income-span">
          <h4 className="categories-breakdown">Food</h4>
          <p className="budget-count">$0.00/$0.00</p>
        </div>
        <ProgressBar progress={67} large={false} />
      </div>
    </>
  );
};

export default BudgetSummary;
