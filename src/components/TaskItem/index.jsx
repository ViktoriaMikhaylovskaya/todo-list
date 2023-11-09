import "./styles.css";
import { reverseDate, reverseDateWithTime } from "../../utils";

const TaskItem = ({
  task,
  checkboxHandler,
  setEditedTaskId,
  onClickDeleteTask,
}) => {
  const { description, title, createdDate, id, completed, deadlineDate } = task;

  return (
    <li className="item">
      <p className="task-date">от {reverseDateWithTime(createdDate)}</p>
      <div className="task-title">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => checkboxHandler(e.target.checked, id)}
        />
        <div
          className="title"
          style={{
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </div>
      </div>

      {description && <div className="task-description">{description}</div>}
      <span>Deadline date: {reverseDate(deadlineDate)}</span>

      <div className="buttons-wrapper">
        <button onClick={() => setEditedTaskId(id)}>edit</button>
        <button className="delete-button" onClick={() => onClickDeleteTask(id)}>
          delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
