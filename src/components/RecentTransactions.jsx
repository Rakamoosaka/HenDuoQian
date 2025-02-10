import "../styles/components.scss";
import useStore from "../store/useStore";
const RecentTransactions = () => {
  const { transactions, settings } = useStore();
  const currencySymbols = { USD: "$", EUR: "€", KZT: "₸", RUB: "₽" };
  const currencySign = currencySymbols[settings.currency];
  return (
    <div className="content-card transaction-history">
      <h1>Recent Transactions</h1>
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
          {transactions.slice(0, 5).map((transaction) => (
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

export default RecentTransactions;
