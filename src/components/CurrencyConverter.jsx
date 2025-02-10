import axios from "axios";
import "../styles/components.scss";
import { useEffect, useState } from "react";

import useStore from "../store/useStore";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [convertedCurrency, setConvertedCurrency] = useState("KZT");

  const { exchangeRates, fetchExchangeRates } = useStore();

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const convertCurrency = (amount, currentCurrency, selectedCurrency) => {
    if (
      amount &&
      exchangeRates[selectedCurrency] &&
      exchangeRates[currentCurrency]
    ) {
      const convertedCurrency =
        (amount * exchangeRates[selectedCurrency]) /
        exchangeRates[currentCurrency];
      setConvertedAmount(convertedCurrency.toFixed(2));
      return;
    }
    setConvertedAmount(0);
  };

  useEffect(() => {
    convertCurrency(amount, currentCurrency, convertedCurrency);
  }, [amount, currentCurrency, convertedCurrency]);
  return (
    <>
      <div className="content-card">
        <h1>Currency Converter</h1>
        <section className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              e.target.value ? setAmount(e.target.value) : setAmount(0)
            }
            onFocus={(event) => event.target.select()}
          />
          <select
            className="select"
            value={currentCurrency}
            onChange={(e) => setCurrentCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KZT">KZT</option>
            <option value="RUB">RUB</option>
          </select>
        </section>
        <section className="input-group">
          <input type="number" value={convertedAmount} readOnly />
          <select
            className="select"
            value={convertedCurrency}
            onChange={(e) => setConvertedCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KZT">KZT</option>
            <option value="RUB">RUB</option>
          </select>
        </section>
      </div>
    </>
  );
};

export default CurrencyConverter;
