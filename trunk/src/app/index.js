import React, { useState } from "react";
import Symbols from "./components/symbols";
import Charts from "./components/charts";
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
            <Symbols
              active_currency={active_currency}
              setActiveSymbol={updateActiveSymbol}
            />
          </div>
          <Charts active_currency={active_currency} />
        </section>
      </div>
    </div>
  );
};

export default App;
