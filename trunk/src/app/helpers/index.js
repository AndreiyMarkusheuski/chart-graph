import { CANDLES, TICKS } from "../consts";

export const parseTicks = (data) => {
  const parsed = {};
  const { history } = data;
  const [prices, times] = Object.values(history);
  parsed[TICKS] = prices.reduce((acc, item, index) => {
    acc[index] = {
      value: item,
      time: times[index] * 1000,
    };
    return acc;
  }, []);
  return parsed;
};

export const parseCandles = (data) => {
  const parsed = {};
  const { candles } = data;
  parsed[CANDLES] = candles.map((item) => {
    const { epoch, ...rest } = item;
    return { ...rest, time: epoch * 1000 };
  });
  return parsed;
};

export const isCandlesType = (type) => type === CANDLES;
