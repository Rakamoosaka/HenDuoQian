import "../styles/components.scss";
import IncomeExpensesChart from "./ui/IncomeExpensesChart";

const IncomeVSExpenses = () => {
  return (
    <div className="content-card income-vs-expenses">
      <h1>Income vs Expenses</h1>
      <section className="graphchart">
        <IncomeExpensesChart />
      </section>
    </div>
  );
};

export default IncomeVSExpenses;
