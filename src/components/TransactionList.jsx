import "../styles/components.scss";
import useStore from "../store/useStore";
import { useState } from "react";
const TransactionList = () => {
  const { transactions, settings } = useStore();
  const [transactionType, setTransactionType] = useState("all");
  const currencySymbols = { USD: "$", EUR: "€", KZT: "₸", RUB: "₽" };
  const currencySign = currencySymbols[settings.currency];

  return (
    <div className="content-card transaction-list">
      <h1>Transaction List</h1>
      <select
        className="select"
        name="transactions"
        id="transactions"
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="all">All transactions</option>
        <option value="income">Income only</option>
        <option value="expense">Expense only</option>
      </select>
      <table className="transaction-table">
        <thead className="border-bottom">
          <tr className="transaction-table-headers">
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="transaction-tbody">
          {transactions
            .filter(
              (transaction) =>
                transaction.type === transactionType ||
                transactionType === "all"
            )
            .map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td
                  style={{
                    color: transaction.type === "income" ? "green" : "red",
                  }}
                >
                  {currencySign}
                  {transaction.amount}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
