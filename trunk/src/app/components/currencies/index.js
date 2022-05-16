import React, { useEffect, useRef, useState } from "react";
import { WSS_URL } from "../../consts";
import { getCurrencies } from "../../services/ws-queries";
import "./style.scss";

const Currencies = ({ setActiveSymbol }) => {
  const [symbols, setSymbols] = useState([]);
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WSS_URL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(getCurrencies()));
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.error !== undefined) {
        throw new Error(data.error.message);
      }
      const { active_symbols } = data;
      const parsedData = active_symbols.reduce((acc, item) => {
        let newItem = { name: item.display_name, symbol: item.symbol };
        acc.push(newItem);
        return acc;
      }, []);
      setSymbols(parsedData);
      setFilteredSymbols(parsedData);
    };

    ws.current.onerror = (error) => {
      throw new Error(`[error] ${error.message}`);
    };

    return () => {
      ws.current.close(1000);
    };
  }, []);

  const setFilter = (value) => {
    let filterValue =
      value.length <= 0
        ? symbols
        : symbols.filter((item) => item.name.indexOf(value) >= 0);
    setFilteredSymbols(filterValue);
  };

  return symbols.length > 0 ? (
    <div className="currencies">
      <input
      className='currencies__input'
        value={inputValue}
        onChange={({ target }) => {
          setInputValue(target.value);
          setFilter(target.value);
        }}
        placeholder="set filter..."
      />
      {filteredSymbols.length > 0 && (
        <ul className="currencies__list">
          {filteredSymbols.map(({ name, symbol }) => (
            <li
              onClick={() => {
                setActiveSymbol({ name, symbol });
              }}
              className="currencies__list_item"
              key={symbol}
              id={symbol}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : null;
};

export default Currencies;
