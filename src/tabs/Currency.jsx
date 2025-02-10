import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";
import CurrencyConverter from "../components/CurrencyConverter";
import ExchangeRates from "../components/ExchangeRates";
const Currency = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">Currency</h1>
            <section className="card-container">
              <CurrencyConverter />
              <ExchangeRates />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
