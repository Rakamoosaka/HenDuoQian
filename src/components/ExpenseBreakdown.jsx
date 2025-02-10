import "../styles/components.scss";
import CustomPieChart from "./smaller components/PieChart";
import useStore from "../store/useStore";
import { useEffect } from "react";

const ExpenseBreakdown = () => {
  const { calculateExpenseByCategory, categories, transactions } = useStore();

  useEffect(() => {
    calculateExpenseByCategory();
  }, [transactions]);

  const categoryNames = categories.map((category) => category.name);
  const categorySpent = categories.map((category) => category.spent);

  return (
    <div className="content-card expense-breakdown">
      <h1>Expense Breakdown</h1>
      <section className="piechart">
        <CustomPieChart labels={categoryNames} dataset={categorySpent} />
      </section>
    </div>
  );
};

export default ExpenseBreakdown;
