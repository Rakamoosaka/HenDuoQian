import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useStore from "../../store/useStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpensesChart = () => {
  const transactions = useStore((state) => state.transactions);
  const { settings } = useStore();
  const isDarkMode = settings.darkmode;

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyIncome = new Array(12).fill(0);
  const monthlyExpenses = new Array(12).fill(0);

  transactions.forEach((transaction) => {
    const [day, month, year] = transaction.date.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    const amount = parseFloat(transaction.amount);

    if (transaction.type === "income") {
      monthlyIncome[monthIndex] += amount;
    } else if (transaction.type === "expense") {
      monthlyExpenses[monthIndex] += amount;
    }
  });

  const textColor = isDarkMode ? "#fafafa" : "#333333";
  const gridColor = isDarkMode
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.2)";
  const tooltipBg = isDarkMode
    ? "rgba(255, 255, 255, 0.9)"
    : "rgba(0, 0, 0, 0.8)";
  const tooltipText = isDarkMode ? "#000000" : "#ffffff";

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: monthlyIncome,
        borderColor: "#8884d8",
        backgroundColor: "#82ca9d",
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 7,
        fill: false,
        borderWidth: 1,
        pointBackgroundColor: "#ffffff",
      },
      {
        label: "Expenses",
        data: monthlyExpenses,
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 7,
        fill: false,
        borderWidth: 1,
        pointBackgroundColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1500,
          color: textColor,
        },
        grid: {
          color: gridColor,
          borderDash: [5, 5],
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
          borderWidth: 1,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
          borderDash: [5, 5],
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
          borderWidth: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "dash",
          font: { size: 18 },
          color: textColor,
        },
      },
      tooltip: {
        intersect: false,
        mode: "index",
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default IncomeExpensesChart;
