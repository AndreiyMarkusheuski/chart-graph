export const getTicks = (symbol, tickType) => ({
  ticks_history: `${symbol}`,
  adjust_start_time: 1,
  end: "latest",
  start: 1,
  count: 1000,
  style: `${tickType}`,
});

export const getCurrencies = () => ({
  active_symbols: "brief",
  product_type: "basic",
});
