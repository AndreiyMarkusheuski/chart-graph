import React, { useEffect, useState } from "react";
import { WSS_URL } from "../../consts";
import Chart from "../lightweight";

import "./style.scss";

const Charts = ({ active_currency }) => {
  const [tiсks, setTiсks] = useState([]);
  const [cache, setCache] = useState({});

  const ws = new WebSocket(WSS_URL);

  useEffect(() => {
    if (cache[active_currency.symbol]) {
      setTiсks(cache[active_currency.symbol]);
    } else {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            ticks_history: `${active_currency.symbol}`,
            adjust_start_time: 1,
            end: "latest",
            start: 1,
            style: "ticks",
          })
        );
      };

      ws.addEventListener("message", (e) => {
        const { history } = JSON.parse(e.data);
        const [prices, times] = Object.values(history);
        const parse = prices.reduce((acc, item, index) => {
          acc[index] = {
            value: item,
            time: times[index] * 1000,
          };
          return acc;
        }, []);

        setCache((prev) => {
          let { symbol } = active_currency;
          let newOne = {};
          newOne[symbol] = [...parse];
          return { ...prev, ...newOne };
        });
        setTiсks(parse);
      });

      return () => {
        ws.close(1000);
      };
    }
  }, [active_currency]);

  return (
    <div className="chart">
      <Chart tiсks={tiсks} />
    </div>
  );
};

export default Charts;
