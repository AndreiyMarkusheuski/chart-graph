import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { chartConfig, seriesConfig } from "./chart-config";

const Chart = ({ ticks, tickType }) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const series = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, chartConfig);
  }, []);

  useEffect(() => {
    if (series.current) chart.current.removeSeries(series.current);
    series.current = seriesConfig[tickType](chart.current);
    series.current.setData(ticks);
  }, [ticks]);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div className="chart">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default Chart;
