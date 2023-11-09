import { useState, useId } from "react";
import { getActualDate, getActualDateWithTime } from "../../utils";
import "./styles.css";

const CreateNewTaskModal = ({ onCloseModal, updateTaskList }) => {
  const id = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const saveNewTask = () => {
    const tasks = JSON.parse(window.localStorage.getItem("tasks")) || {};
    const taskInfo = {
      id,
      title,
      description,
      deadlineDate,
      createdDate: getActualDateWithTime(),
      completed: false,
    };

    console.log({ ...tasks, [id]: taskInfo });
    window.localStorage.setItem(
      "tasks",
      JSON.stringify({ ...tasks, [id]: taskInfo })
    );
    onCloseModal();
    updateTaskList();
  };

  const resetData = () => {
    setTitle("");
    setDescription("");
    setDeadlineDate("");
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Create new task</h2>
        <button className="red-button" onClick={onCloseModal}>
          cancel
        </button>
      </div>
      <label>
        <div className="description">Заголовок*</div>
        <input
          className="title-field"
          value={title}
          autoFocus
          maxLength={70}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <p className="description">Описание задачи</p>
        <textarea
          className="description-field"
          value={description}
          maxLength={800}
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="date-label">
        <p className="description">Дата выполнения*</p>
        <input
          className="date-input"
          value={deadlineDate}
          type="date"
          min={getActualDate()}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
      </label>

      <div>
        <button
          className="create-button"
          onClick={saveNewTask}
          disabled={!title || !deadlineDate}
        >
          create
        </button>
        <button className="red-button" onClick={resetData}>
          reset
        </button>
      </div>
    </div>
  );
};

export default CreateNewTaskModal;
