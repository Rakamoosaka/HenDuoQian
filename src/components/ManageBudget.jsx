import "../styles/components.scss";
import { useState } from "react";
const ManageBudget = () => {
  const [total, setTotal] = useState(0);
  return (
    <>
      <div className="content-card">
        <h1>Manage Budget</h1>
        <span>Total Budget</span>
        <section className="input-group">
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            onFocus={(event) => event.target.select()}
          />
        </section>
        <button className="button-full">Save Budget</button>
      </div>
    </>
  );
};

export default ManageBudget;
