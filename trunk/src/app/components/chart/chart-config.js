export const seriesConfig = {
  ticks: (chart) =>
    chart.addAreaSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    }),
  candles: (chart) =>
    chart.addCandlestickSeries({
      upColor: "rgb(38,166,154)",
      downColor: "rgb(255,82,82)",
      wickUpColor: "rgb(38,166,154)",
      wickDownColor: "rgb(255,82,82)",
    }),
};

export const chartConfig = {
  width: "100%",
  height: 600,
  layout: {
    backgroundColor: "#253248",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "#334158",
    },
    horzLines: {
      color: "#334158",
    },
  },
  priceScale: {
    borderColor: "#485c7b",
  },
  timeScale: {
    borderColor: "#485c7b",
    logicalRange: {form: 1.5, to: 3.5},
  },
};
