import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const Chart = ({ tiсks, candles }) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const areaSeries = useRef();
  const candlestickSeries = useRef();
  const resizeObserver = useRef();
  const [isScrollPlus, setIsScrollPlus] = useState(false);

  const onWheelScroll = (e) => {
    let wheelDelta = e.deltaY || e.detail || e.wheelDelta;
    if (wheelDelta > 2) {
      !isScrollPlus || setIsScrollPlus(false);
    }

    if (wheelDelta < -2) {
      isScrollPlus || setIsScrollPlus(true);
    }
  };

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
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
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    areaSeries.current = chart.current.addAreaSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    candlestickSeries.current = chart.current.addCandlestickSeries({
      priceScaleId: "left",
    });
  }, []);

  useEffect(() => {
    if (isScrollPlus) {
      areaSeries.current.setData(tiсks);
      candlestickSeries.current.setData([]);
    } else {
      areaSeries.current.setData([]);
      candlestickSeries.current.setData(candles);
    }
  }, [isScrollPlus, tiсks, candles]);

  useEffect(() => {
    if (tiсks) {
      areaSeries.current.setData(tiсks);
    }
  }, [tiсks]);

  useEffect(() => {
    if (candles) {
      candlestickSeries.current.setData(candles);
    }
  }, [candles]);

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
    <div
      className="chart"
      onWheel={onWheelScroll}
      onTouchStart={(e) => {
        console.log("asdsdafs");
      }}
    >
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default Chart;
