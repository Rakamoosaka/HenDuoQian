# HenDuoQian - Personal Finance Tracker

## 🚀 Introduction

HenDuoQian is a personal finance tracking application designed to manage user's income, expenses, and currency exchange rates. The app includes features like transaction tracking, budgeting, dark mode support, and currency conversion.

## 🌟 Features

- 📊 **Income vs Expenses Visualization** - Interactive charts to track financial trends.
- 🔄 **Currency Converter** - Convert transactions between multiple currencies.
- 📜 **Transaction History** - View and manage past income and expenses.
- 🎨 **Dark Mode Support** - Seamless switch between light and dark themes.
- 🛠️ **Custom Categories** - Add and manage your own expense categories.
- 📈 **Exchange Rates Fetching** - Automatically retrieve exchange rates from an API.

## 🛠️ Tech Stack

- **Frontend:** React.js, Zustand (state management), Chart.js
- **Styling:** SCSS (Dark mode supported)
- **API:** Axios (for fetching currency exchange rates)
- **Build Tool:** Vite

## 📂 Project Structure

```
HenDuoQian/
│── services/
│   ├── api.js   # API request handler
│── store/
│   ├── useStore.js  # Zustand store for state management
│── styles/
│   ├── global.scss  # Global styles & dark mode variables
│   ├── components.scss  # Component-specific styles
│── tabs/
│   ├── Budget.jsx
│   ├── Currency.jsx
│   ├── Dashboard.jsx
│   ├── Header.jsx
│   ├── History.jsx
│   ├── Settings.jsx
│   ├── Sidebar.jsx
│   ├── Transactions.jsx
│── App.jsx
│── main.jsx
│── .gitignore
│── index.html
│── package.json
│── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/yourusername/henduoqian.git
cd henduoqian
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start the development server

```sh
npm run dev
```

## 🌙 Dark Mode Implementation

Dark mode is managed using **CSS variables** and Zustand. When the user toggles dark mode:

- `document.body.classList.add("dark")` is applied.
- CSS variables defined in `.dark` override light mode styles.
- Zustand persists the user’s preference.

## 🔄 Currency Conversion

- Exchange rates are fetched via the **ExchangeRates API**.
- The `fetchExchangeRates()` function retrieves rates and updates state.
- Transactions are recalculated when the user switches the currency.

## 📌 Zustand State Management

All state is managed using **Zustand**.

- `settings.darkmode` tracks dark mode preference.
- `categories` manage different expense categories.
- `transactions` store user income & expenses.
- `bankAccount` calculates total income, expenses, and net balance.
