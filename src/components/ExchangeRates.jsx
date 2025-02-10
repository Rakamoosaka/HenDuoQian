import useStore from "../store/useStore";
import { useEffect } from "react";
const ExchangeRates = () => {
  const { settings, exchangeRates, fetchExchangeRates } = useStore();
  useEffect(() => {
    fetchExchangeRates();
  }, []);
  const currentCurrencyRate = exchangeRates[settings.currency];
  const usdRate = (currentCurrencyRate / exchangeRates.USD).toFixed(7);
  const eurRate = (currentCurrencyRate / exchangeRates.EUR).toFixed(7);
  const kztRate = (currentCurrencyRate / exchangeRates.KZT).toFixed(7);
  const rubRate = (currentCurrencyRate / exchangeRates.RUB).toFixed(7);

  return (
    <div className="content-card exchange-rates">
      <h1>Exchange Rates</h1>
      <div className="currency-rate border-bottom">
        <span>Currency</span>
        <span>Rate({settings.currency})</span>
      </div>
      <div className="currency-rate-value border-bottom">
        <span>USD</span>
        <span>{usdRate}</span>
      </div>
      <div className="currency-rate-value border-bottom">
        <span>EUR</span>
        <span>{eurRate}</span>
      </div>
      <div className="currency-rate-value border-bottom">
        <span>KZT</span>
        <span>{kztRate}</span>
      </div>
      <div className="currency-rate-value border-bottom">
        <span>RUB</span>
        <span>{rubRate}</span>
      </div>
    </div>
  );
};

export default ExchangeRates;
