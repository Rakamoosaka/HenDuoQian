import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";

import TransactionList from "../components/TransactionList";
import AddTransactionModule from "../components/AddTransactionModule";

const Transactions = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">Transactions</h1>
            <section className="card-container">
              <TransactionList />
              <AddTransactionModule />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
