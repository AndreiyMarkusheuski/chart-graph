import React, { useEffect, useState } from "react";
import { WSS_URL, TICKS, CANDLES } from "../../consts";
import Chart from "../lightweight";

import { parseCandles, parseTicks, parseForCache } from "../../helpers";

import "./style.scss";

const Charts = ({ active_currency }) => {
  const [tiсks, setTiсks] = useState([]);
  const [tickStyle, setTickStyle] = useState("ticks");
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
            count: 1000,
            style: `${tickStyle}`,
          })
        );
        ws.send(
          JSON.stringify({
            ticks_history: `${active_currency.symbol}`,
            adjust_start_time: 1,
            end: "latest",
            start: 1,
            count: 1000,
            style: "candles",
          })
        );
      };

      ws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        if (data["error"]) throw new Error(data["error"]["message"]);
        const {
          echo_req: { ticks_history },
        } = data;
        const parsedData =
          data.msg_type === TICKS ? parseTicks(data) : parseCandles(data);

        setCache((prev) => {
          const copy = { ...prev };

          copy[ticks_history] = copy[ticks_history]
            ? copy[ticks_history].map((item, index) => ({
                ...item,
                ...parsedData[index],
              }))
            : [...parsedData];
          return copy;
        });

        setTiсks((prev) => {
          let a = prev.length < 1
            ? [...parsedData]
            : prev.map((item, index) => ({ ...item, ...parsedData[index] }));
            console.log(a)
            return a
        });
      });

      ws.onerror = (error) => {
        throw new Error(`[error] ${error.message}`);
      };

      return () => {
        ws.close(1000);
      };
    }
  }, [active_currency, tickStyle]);

  return (
    <div className="chart">
      <Chart tiсks={tiсks} />
    </div>
  );
};

export default Charts;
