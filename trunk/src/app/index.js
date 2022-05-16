import React, { useState } from "react";
import Currencies from "./components/currencies";
import Charts from "./components/trading-view";
import {
  getStorageСurrency,
  setStorageСurrency,
} from "./services/localStorage";
import { DEFAULT_CURRENCY } from "./consts";

const App = () => {
  const [active_currency, setActiveSymbol] = useState(
    getStorageСurrency() || DEFAULT_CURRENCY
  );

  const updateActiveSymbol = (currency) => {
    setStorageСurrency(currency);
    setActiveSymbol(currency);
  };
  
  return (
    <div className="main">
      <div className="container">
        <section className="content">
          <div className="content__top">
            <h1 className="content__top_headline">
              Chart for {active_currency.name}
            </h1>
            <Currencies
              setActiveSymbol={updateActiveSymbol}
            />
          </div>
          <Charts active_symbol={active_currency.symbol} />
        </section>
      </div>
    </div>
  );
};

export default App;
