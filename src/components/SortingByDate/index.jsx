import "./styles.css";
import { useState } from "react";

const SortingByDate = ({ sortTasksByDate }) => {
  const [sortMethod, setSortMethod] = useState("createdDate");

  const sortingMethodHandler = (method) => {
    setSortMethod(method);
    sortTasksByDate(method);
  };

  return (
    <div className="sorting">
      <p>Сортировка:</p>
      <button
        style={{
          backgroundColor:
            sortMethod === "createdDate" ? "#3bceac" : "transparent",
        }}
        onClick={() => sortingMethodHandler("createdDate")}
      >
        по дате создания
      </button>
      <button
        style={{
          backgroundColor:
            sortMethod === "deadlineDate" ? "#3bceac" : "transparent",
        }}
        onClick={() => sortingMethodHandler("deadlineDate")}
      >
        по сроку выполнения
      </button>
    </div>
  );
};

export default SortingByDate;
