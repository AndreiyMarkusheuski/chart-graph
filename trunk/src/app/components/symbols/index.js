import React, { useEffect, useState } from "react";
import { WSS_URL } from "../../consts";
import "./style.scss";

const Symbols = ({ setActiveSymbol }) => {
  const [symbols, setSymbols] = useState([]);
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let ws = new WebSocket(WSS_URL);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          active_symbols: "brief",
          product_type: "basic",
        })
      );
    };

    ws.addEventListener("message", (e) => {
      ws.close(1000);
      const { active_symbols } = JSON.parse(e.data);
      const parsedData = active_symbols.reduce((acc, item) => {
        let newItem = { name: item.display_name, symbol: item.symbol };
        acc.push(newItem);
        return acc;
      }, []);
      setSymbols(parsedData);
      setFilteredSymbols(parsedData);
    });

    ws.addEventListener("close", () => {
      console.log("ws closed");
    });

    return () => {
      ws.close(1000);
    };
  }, []);

  const setFilter = (e) => {
    const value = e.target.value;
    setInputValue(value);
    let filterValue =
      value.length <= 0
        ? symbols
        : symbols.filter((item) => item.name.indexOf(value) >= 0);
    setFilteredSymbols(filterValue);
  };

  if (symbols.length > 0) {
    return (
      <div className="symbols">
        <input value={inputValue} onChange={setFilter} placeholder="filter" />
        {filteredSymbols.length > 0 && (
          <ul className="symbols__list">
            {filteredSymbols.map(({ name, symbol }) => (
              <li
                onClick={() => {
                  setActiveSymbol({ name, symbol });
                }}
                className="symbols__list_item"
                key={symbol}
                id={symbol}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } else null;
};

export default Symbols;
