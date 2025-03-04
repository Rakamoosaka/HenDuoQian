import "../styles/components.scss";
import { useState } from "react";
import useStore from "../store/useStore";
import deleteIcon from "../assets/delete-category.svg";
import "../styles/global.scss";
const ManageCategories = () => {
  const { categories, addCategory, deleteCategory } = useStore();
  const [categoryName, setCategoryName] = useState("");

  const isDuplicate = categories.some(
    (category) =>
      category.name.toLowerCase() === categoryName.trim().toLowerCase()
  );
  const isValid =
    categoryName.trim().length > 0 &&
    !isDuplicate &&
    categoryName.trim.length < 30;

  return (
    <>
      <div className="content-card">
        <h1>Manage Categories</h1>
        <section className="input-group">
          <input
            type="text"
            value={categoryName}
            placeholder="New category name"
            onChange={(e) => setCategoryName(e.target.value)}
            onFocus={(event) => event.target.select()}
          />
          <button
            className={`button-default ${isValid ? "" : "disabled-button"}`}
            onClick={() => {
              if (isValid) {
                addCategory(categoryName.trim());
                setCategoryName("");
              }
            }}
            disabled={!isValid}
          >
            Add
          </button>
        </section>
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category.id} className="justify-between">
              <span>{category.name}</span>
              <button
                className="background-none"
                onClick={() => deleteCategory(category.id)}
              >
                <img src={deleteIcon} width="16" height="16" alt="Delete" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManageCategories;
