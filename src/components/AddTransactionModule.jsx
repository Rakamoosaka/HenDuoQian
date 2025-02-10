import "../styles/components.scss";
import { useState } from "react";
import useStore from "../store/useStore";
const AddTransactionModule = () => {
  const { addTransaction, categories } = useStore();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransacitonType] = useState("");

  const isValid =
    amount > 0 &&
    amount < 9999999999 &&
    description.length > 0 &&
    description.length < 30 &&
    category &&
    transactionType;

  return (
    <>
      <div className="content-card">
        <h1>Add Transaction</h1>
        <section className="add-transaction-inputs">
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => {
              const value = e.target.value;
              setDescription(value.trim());
            }}
            onFocus={(event) => event.target.select()}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 || e.target.value === "") {
                setAmount(Number(e.target.value));
              }
            }}
            placeholder="Amount"
            onFocus={(event) => event.target.select()}
          />
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="select"
            value={transactionType}
            onChange={(e) => setTransacitonType(e.target.value)}
          >
            <option value="" disabled hidden>
              Select type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            disabled={!isValid}
            className={`button-default ${isValid ? "" : "disabled-button"}`}
            onClick={() => {
              addTransaction({
                amount: amount,
                description: description,
                category: category,
                type: transactionType,
              });
              setAmount(0);
              setCategory("");
              setDescription("");
              setTransacitonType("");
            }}
          >
            Add Transcation
          </button>
        </section>
      </div>
    </>
  );
};

export default AddTransactionModule;
