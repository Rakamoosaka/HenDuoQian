import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";
import IncomeVSExpenses from "../components/IncomeVSExpenses";
import TransactionHistory from "../components/TransactionHistory";
const History = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">History</h1>
            <section className="card-container">
              <IncomeVSExpenses />
              <TransactionHistory />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
