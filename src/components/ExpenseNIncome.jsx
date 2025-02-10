import "../styles/components.scss";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import useStore from "../store/useStore";
import { useEffect } from "react";

const ExpenseNIncome = () => {
  const { transactions, calculateBankAccount, bankAccount, settings } =
    useStore();
  const currencySymbols = { USD: "$", EUR: "€", KZT: "₸", RUB: "₽" };
  const currencySign = currencySymbols[settings.currency];
  useEffect(() => {
    calculateBankAccount();
  }, [transactions]);
  return (
    <div className="content-card">
      <h1>Expense & Income</h1>

      <div className="expense-income-span">
        <div className="income-lil-box">
          <span>
            {currencySign}
            {bankAccount.totalIncome.toFixed(2)}
          </span>
          <p>Total Income</p>
        </div>
        <ArrowUpIcon size={32} color="rgb(34, 197, 94)" />
      </div>
      <div className="expense-income-span">
        <div className="expense-lil-box">
          <span>
            {currencySign}
            {bankAccount.totalExpense.toFixed(2)}
          </span>
          <p>Total Expenses</p>
        </div>
        <ArrowDownIcon size={32} color="rgb(239, 68, 68)" />
      </div>
      <hr className="hr" />
      <div className="expense-income-span">
        <p className="net-balance">Net balance</p>
        <span className="net-balance-value">
          {currencySign}
          {bankAccount.netBalance.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseNIncome;
