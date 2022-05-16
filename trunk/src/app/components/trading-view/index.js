import React, { useEffect, useRef, useState } from "react";

import Chart from "../chart";

import { WSS_URL, CHART_TYPE } from "../../consts";
import { parseCandles, parseTicks, isCandlesType } from "../../helpers";
import { getTicks } from "../../services/ws-queries";

import "./style.scss";

const TradingView = ({ active_symbol }) => {
  const [tiсks, setTiсks] = useState([]);
  const [tickType, setTickType] = useState(CHART_TYPE[0]);
  const [cache, setCache] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    if (cache[active_symbol] && cache[active_symbol][tickType]) {
      setTiсks(cache[active_symbol][tickType]);
    } else {
      ws.current = new WebSocket(WSS_URL);
      ws.current.onopen = () => {
        ws.current.send(
          JSON.stringify(getTicks(active_symbol, tickType))
        );
      };

      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.error !== undefined) {
          throw new Error(data.error.message);
        }
        const {
          echo_req: { ticks_history },
        } = data;

        const parsedData = isCandlesType(data.msg_type) ? parseCandles(data) : parseTicks(data);

        setCache((prev) => {
          const copy = { ...prev };
          copy[ticks_history] = { ...copy[ticks_history], ...parsedData };
          return copy;
        });

        setTiсks(parsedData[tickType]);
      };

      ws.current.onerror = (error) => {
        throw new Error(`[error] ${error.message}`);
      };

      return () => {
        ws.current.close(1000);
      };
    }
  }, [tickType, active_symbol]);

  return tiсks.length > 0 ? (
    <div className="trading-view">
      <select
      className='trading-view__select'
        name="chart-type"
        onChange={(e) => {
          setTickType(e.target.value);
        }}
      >
        {CHART_TYPE.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Chart ticks={tiсks} tickType={tickType} />
    </div>
  ) : null;
};

export default TradingView;
