import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

import { API_KEY, CURRENCY_API } from "../services/api";

const useStore = create(
  persist((set, get) => {
    return {
      settings: {
        darkmode: false,
        currency: "USD",
        language: "en",
      },
      categories: [
        { id: 1, name: "Food", budget: 300, spent: 0 },
        { id: 2, name: "Housing", budget: 1200, spent: 0 },
        { id: 3, name: "Utilities", budget: 150, spent: 0 },
        { id: 4, name: "Transport", budget: 300, spent: 0 },
        { id: 5, name: "Entertainment", budget: 200, spent: 0 },
        { id: 6, name: "Health", budget: 250, spent: 0 },
        { id: 7, name: "Income", budget: 5000, spent: 0 },
      ],

      budget: {
        totalLimit: 0,
        categoryLimits: {},
      },
      bankAccount: {
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
      },

      exchangeRates: { USD: 1.03, EUR: 1, KZT: 529, RUB: 100 },
      fetchExchangeRates: async () => {
        try {
          const response = await axios.get(`${CURRENCY_API}`, {
            params: {
              access_key: API_KEY,
              symbols: "USD,RUB,KZT,EUR",
            },
          });
          set({ exchangeRates: response.data.rates });
        } catch (error) {
          console.log("Error while fetching echange rates: " + error);
        }
      },

      updateSettings: (newSettings) =>
        set((state) => {
          return {
            settings: { ...state.settings, ...newSettings },
          };
        }),
      addCategory: (newCategory) =>
        set((state) => {
          return {
            categories: [
              ...state.categories,
              { id: Date.now(), name: newCategory, budget: 0, spent: 0 },
            ],
          };
        }),
      deleteCategory: (deletedCategory) =>
        set((state) => {
          return {
            categories: state.categories.filter(
              (category) => category.id !== deletedCategory
            ),
          };
        }),
      addTransaction: (transaction) =>
        set((state) => {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const formattedDate = `${day}-${month}-${year}`;
          return {
            transactions: [
              ...state.transactions,
              { id: Date.now(), date: formattedDate, ...transaction },
            ],
          };
        }),
      calculateBankAccount: () =>
        set((state) => {
          const totalIncome = state.transactions.reduce(
            (sum, transaction) =>
              transaction.type === "income"
                ? sum + parseFloat(transaction.amount)
                : sum,
            0
          );
          const totalExpense = state.transactions.reduce(
            (sum, transaction) =>
              transaction.type === "expense"
                ? sum + parseFloat(transaction.amount)
                : sum,
            0
          );
          const netBalance = parseFloat(
            (totalIncome - totalExpense).toFixed(2)
          );

          return {
            bankAccount: {
              totalIncome: totalIncome,
              totalExpense: totalExpense,
              netBalance: netBalance,
            },
          };
        }),

      updateTransactionsCurrency: (oldCurrency, newCurrency) =>
        set((state) => {
          return {
            transactions: state.transactions.map((transaction) => ({
              ...transaction,
              amount: (
                (transaction.amount * get().exchangeRates[newCurrency]) /
                get().exchangeRates[oldCurrency]
              ).toFixed(2),
            })),
          };
        }),
      calculateExpenseByCategory: () =>
        set((state) => {
          const categoryExpenses = {};

          state.transactions.forEach((transaction) => {
            if (transaction.type === "expense") {
              if (!categoryExpenses[transaction.category]) {
                categoryExpenses[transaction.category] = 0;
              }
              categoryExpenses[transaction.category] += parseFloat(
                transaction.amount
              );
            }
          });
          return {
            categories: state.categories.map((category) => ({
              ...category,
              spent: categoryExpenses[category.name] || 0,
            })),
          };
        }),

      transactions: [
        {
          id: 1,
          date: "05-01-2025",
          description: "Groceries",
          category: "Food",
          amount: 250,
          type: "expense",
        },
        {
          id: 2,
          date: "10-01-2025",
          description: "Monthly Rent",
          category: "Housing",
          amount: 1200,
          type: "expense",
        },
        {
          id: 3,
          date: "15-01-2025",
          description: "Electricity Bill",
          category: "Utilities",
          amount: 80,
          type: "expense",
        },
        {
          id: 4,
          date: "20-02-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 60,
          type: "expense",
        },
        {
          id: 5,
          date: "25-02-2025",
          description: "Netflix Subscription",
          category: "Entertainment",
          amount: 15,
          type: "expense",
        },
        {
          id: 6,
          date: "05-03-2025",
          description: "Doctor Visit",
          category: "Health",
          amount: 100,
          type: "expense",
        },
        {
          id: 7,
          date: "10-03-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1300,
          type: "income",
        },
        {
          id: 8,
          date: "15-03-2025",
          description: "Monthly Salary",
          category: "Income",
          amount: 3500,
          type: "income",
        },
        {
          id: 9,
          date: "20-04-2025",
          description: "Water Bill",
          category: "Utilities",
          amount: 40,
          type: "expense",
        },
        {
          id: 10,
          date: "25-04-2025",
          description: "Cinema Tickets",
          category: "Entertainment",
          amount: 25,
          type: "expense",
        },
        {
          id: 11,
          date: "05-05-2025",
          description: "Gym Membership",
          category: "Health",
          amount: 50,
          type: "expense",
        },
        {
          id: 12,
          date: "10-05-2025",
          description: "Dinner with Friends",
          category: "Food",
          amount: 80,
          type: "expense",
        },
        {
          id: 13,
          date: "15-06-2025",
          description: "New Year Bonus",
          category: "Income",
          amount: 1000,
          type: "income",
        },
        {
          id: 14,
          date: "20-06-2025",
          description: "Car Maintenance",
          category: "Transport",
          amount: 200,
          type: "expense",
        },
        {
          id: 15,
          date: "25-07-2025",
          description: "Internet Bill",
          category: "Utilities",
          amount: 50,
          type: "expense",
        },
        {
          id: 16,
          date: "05-08-2025",
          description: "Groceries",
          category: "Food",
          amount: 300,
          type: "expense",
        },
        {
          id: 17,
          date: "10-09-2025",
          description: "Monthly Rent",
          category: "Housing",
          amount: 1200,
          type: "expense",
        },
        {
          id: 18,
          date: "15-09-2025",
          description: "Electricity Bill",
          category: "Utilities",
          amount: 85,
          type: "expense",
        },
        {
          id: 19,
          date: "20-10-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 70,
          type: "expense",
        },
        {
          id: 20,
          date: "25-11-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1400,
          type: "income",
        },
        {
          id: 21,
          date: "01-12-2025",
          description: "Monthly Salary",
          category: "Income",
          amount: 3600,
          type: "income",
        },
        {
          id: 22,
          date: "03-01-2025",
          description: "Dining Out",
          category: "Food",
          amount: 45,
          type: "expense",
        },
        {
          id: 23,
          date: "07-01-2025",
          description: "Internet Bill",
          category: "Utilities",
          amount: 50,
          type: "expense",
        },
        {
          id: 24,
          date: "12-01-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 70,
          type: "expense",
        },
        {
          id: 25,
          date: "18-01-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1200,
          type: "income",
        },
        {
          id: 26,
          date: "23-01-2025",
          description: "Movie Tickets",
          category: "Entertainment",
          amount: 30,
          type: "expense",
        },
        {
          id: 27,
          date: "28-01-2025",
          description: "Pharmacy",
          category: "Health",
          amount: 20,
          type: "expense",
        },
        {
          id: 28,
          date: "04-02-2025",
          description: "Groceries",
          category: "Food",
          amount: 100,
          type: "expense",
        },
        {
          id: 29,
          date: "10-02-2025",
          description: "Water Bill",
          category: "Utilities",
          amount: 40,
          type: "expense",
        },
        {
          id: 30,
          date: "15-02-2025",
          description: "Taxi Fare",
          category: "Transport",
          amount: 25,
          type: "expense",
        },
        {
          id: 31,
          date: "21-02-2025",
          description: "Salary",
          category: "Income",
          amount: 3500,
          type: "income",
        },
        {
          id: 32,
          date: "26-02-2025",
          description: "Concert",
          category: "Entertainment",
          amount: 75,
          type: "expense",
        },
        {
          id: 33,
          date: "01-03-2025",
          description: "Doctor Visit",
          category: "Health",
          amount: 90,
          type: "expense",
        },
        {
          id: 34,
          date: "08-03-2025",
          description: "Dining Out",
          category: "Food",
          amount: 60,
          type: "expense",
        },
        {
          id: 35,
          date: "14-03-2025",
          description: "Electricity Bill",
          category: "Utilities",
          amount: 85,
          type: "expense",
        },
        {
          id: 36,
          date: "20-03-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 80,
          type: "expense",
        },
        {
          id: 37,
          date: "27-03-2025",
          description: "Bonus",
          category: "Income",
          amount: 1000,
          type: "income",
        },
        {
          id: 38,
          date: "03-04-2025",
          description: "Netflix Subscription",
          category: "Entertainment",
          amount: 15,
          type: "expense",
        },
        {
          id: 39,
          date: "09-04-2025",
          description: "Pharmacy",
          category: "Health",
          amount: 35,
          type: "expense",
        },
        {
          id: 40,
          date: "15-04-2025",
          description: "Groceries",
          category: "Food",
          amount: 120,
          type: "expense",
        },
        {
          id: 41,
          date: "22-04-2025",
          description: "Mortgage Payment",
          category: "Housing",
          amount: 1100,
          type: "expense",
        },
        {
          id: 42,
          date: "28-04-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1500,
          type: "income",
        },
        {
          id: 43,
          date: "02-05-2025",
          description: "Cinema Tickets",
          category: "Entertainment",
          amount: 50,
          type: "expense",
        },
        {
          id: 44,
          date: "07-05-2025",
          description: "Gym Membership",
          category: "Health",
          amount: 45,
          type: "expense",
        },
        {
          id: 45,
          date: "14-05-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 90,
          type: "expense",
        },
        {
          id: 46,
          date: "19-05-2025",
          description: "Public Transit",
          category: "Transport",
          amount: 30,
          type: "expense",
        },
        {
          id: 47,
          date: "25-05-2025",
          description: "Salary",
          category: "Income",
          amount: 3800,
          type: "income",
        },
        {
          id: 48,
          date: "31-05-2025",
          description: "Internet Bill",
          category: "Utilities",
          amount: 50,
          type: "expense",
        },
        {
          id: 49,
          date: "05-06-2025",
          description: "Dining Out",
          category: "Food",
          amount: 85,
          type: "expense",
        },
        {
          id: 50,
          date: "10-06-2025",
          description: "Water Bill",
          category: "Utilities",
          amount: 40,
          type: "expense",
        },
        {
          id: 51,
          date: "15-06-2025",
          description: "Concert",
          category: "Entertainment",
          amount: 120,
          type: "expense",
        },
        {
          id: 52,
          date: "22-06-2025",
          description: "Bonus",
          category: "Income",
          amount: 1500,
          type: "income",
        },
        {
          id: 53,
          date: "28-06-2025",
          description: "Doctor Visit",
          category: "Health",
          amount: 80,
          type: "expense",
        },
        {
          id: 54,
          date: "04-07-2025",
          description: "Groceries",
          category: "Food",
          amount: 90,
          type: "expense",
        },
        {
          id: 55,
          date: "09-07-2025",
          description: "Electricity Bill",
          category: "Utilities",
          amount: 75,
          type: "expense",
        },
        {
          id: 56,
          date: "15-07-2025",
          description: "Taxi Fare",
          category: "Transport",
          amount: 50,
          type: "expense",
        },
        {
          id: 57,
          date: "22-07-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1600,
          type: "income",
        },
        {
          id: 58,
          date: "29-07-2025",
          description: "Streaming Service",
          category: "Entertainment",
          amount: 15,
          type: "expense",
        },
        {
          id: 59,
          date: "02-08-2025",
          description: "Dining Out",
          category: "Food",
          amount: 55,
          type: "expense",
        },
        {
          id: 60,
          date: "08-08-2025",
          description: "Water Bill",
          category: "Utilities",
          amount: 45,
          type: "expense",
        },
        {
          id: 61,
          date: "14-08-2025",
          description: "Gasoline",
          category: "Transport",
          amount: 85,
          type: "expense",
        },
        {
          id: 62,
          date: "20-08-2025",
          description: "Salary",
          category: "Income",
          amount: 4000,
          type: "income",
        },
        {
          id: 63,
          date: "26-08-2025",
          description: "Gym Membership",
          category: "Health",
          amount: 60,
          type: "expense",
        },
        {
          id: 64,
          date: "01-09-2025",
          description: "Internet Bill",
          category: "Utilities",
          amount: 55,
          type: "expense",
        },
        {
          id: 65,
          date: "07-09-2025",
          description: "Movie Tickets",
          category: "Entertainment",
          amount: 40,
          type: "expense",
        },
        {
          id: 66,
          date: "12-09-2025",
          description: "Freelance Payment",
          category: "Income",
          amount: 1700,
          type: "income",
        },
        {
          id: 67,
          date: "19-09-2025",
          description: "Doctor Visit",
          category: "Health",
          amount: 95,
          type: "expense",
        },
        {
          id: 68,
          date: "25-09-2025",
          description: "Mortgage Payment",
          category: "Housing",
          amount: 1200,
          type: "expense",
        },
      ],
    };
  })
);
export default useStore;
