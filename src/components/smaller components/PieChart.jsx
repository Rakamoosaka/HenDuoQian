import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useStore from "../../store/useStore";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Colors);

const CustomPieChart = ({ labels, dataset }) => {
  const chartRef = useRef(null);
  const { settings } = useStore();
  const isDarkMode = settings.darkmode;

  const originalData = dataset;
  const [chartData, setChartData] = useState(originalData);

  useEffect(() => {
    setChartData(dataset);
  }, [dataset]);

  const options = useMemo(() => {
    const textColor = isDarkMode ? "#fafafa" : "#333";
    const tooltipBgColor = isDarkMode
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(0, 0, 0, 0.8)";
    const tooltipTextColor = isDarkMode ? "#000" : "#fff";

    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
        },
      },
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: textColor,
            font: { size: 14 },
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
          },
          onClick: (event, legendItem) => {
            const index = legendItem.index;
            setChartData((prevData) =>
              prevData[index] === null
                ? [
                    ...prevData.slice(0, index),
                    originalData[index],
                    ...prevData.slice(index + 1),
                  ]
                : [
                    ...prevData.slice(0, index),
                    null,
                    ...prevData.slice(index + 1),
                  ]
            );
          },
          onHover: function (event) {
            event.native.target.style.cursor = "pointer";
          },
        },
        tooltip: {
          backgroundColor: tooltipBgColor,
          titleColor: tooltipTextColor,
          bodyColor: tooltipTextColor,
          footerColor: tooltipTextColor,
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.parsed || 0;
              return `${label}: ${value.toFixed(2)} spent`;
            },
          },
        },
        datalabels: {
          color: "#fff",
          font: { weight: "bold" },
          formatter: (value, context) => {
            if (value === null) return "";
            const dataArr = context.dataset.data;
            const total = dataArr.reduce((acc, val) => acc + (val || 0), 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return percentage >= 3 ? `${percentage}%` : "";
          },
        },
      },
    };
  }, [isDarkMode, originalData]);

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Spent",
          data: chartData,
          borderWidth: 1,
          hoverOffset: 16,
        },
      ],
    };
  }, [labels, chartData]);

  return <Pie ref={chartRef} data={data} options={options} />;
};

export default CustomPieChart;
