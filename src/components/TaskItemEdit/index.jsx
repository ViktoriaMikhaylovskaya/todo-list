import "./styles.css";
import { getActualDate } from "../../utils";

const TaskItemEdit = ({
  task,
  setEditedTask,
  onClickSaveEditedTask,
  onClickDeleteTask,
  editedTask,
  onClickCancelChanges,
}) => {
  const { description, title, id, deadlineDate } = task;

  const onChangeEditedTaskInfo = (e) => {
    const fieldName = e.target.name;

    setEditedTask((editedTask) => ({
      ...editedTask,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <li className="editable-item">
      <input
        value={editedTask.title || title}
        autoFocus
        maxLength={70}
        name="title"
        onChange={onChangeEditedTaskInfo}
      />
      <textarea
        value={editedTask.description || description}
        maxLength={800}
        rows={8}
        name="description"
        onChange={onChangeEditedTaskInfo}
      />
      <input
        value={editedTask.deadlineDate || deadlineDate}
        type="date"
        min={getActualDate()}
        name="deadlineDate"
        onChange={onChangeEditedTaskInfo}
      />
      <div className="buttons">
        <button
          disabled={editedTask.title?.length === 0}
          onClick={() => onClickSaveEditedTask(id)}
        >
          save
        </button>
        <button className="delete-button" onClick={() => onClickDeleteTask(id)}>
          delete
        </button>
        <button className="cancel-button" onClick={onClickCancelChanges}>
          cancel
        </button>
      </div>
    </li>
  );
};

export default TaskItemEdit;
