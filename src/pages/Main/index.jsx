import { useEffect, useState } from "react";
import CreateNewTaskModal from "../../components/CreateNewTaskModal/index";
import TaskItem from "../../components/TaskItem/index";
import TaskItemEdit from "../../components/TaskItemEdit/index";
import SortingByDate from "../../components/SortingByDate/index";
import { sortByDeadlineDate, sortByCreationDate } from "../../utils";
import "./styles.css";

const Main = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState({});
  const [editedTaskId, setEditedTaskId] = useState("");
  const [editedTask, setEditedTask] = useState({});

  const openModalHandler = () => setIsOpenModal(!isOpenModal);

  const checkboxHandler = (ischecked, taskId) => {
    const currentTask = tasks[taskId];
    window.localStorage.setItem(
      "tasks",
      JSON.stringify({
        ...tasks,
        [taskId]: { ...currentTask, completed: ischecked },
      })
    );
    getTasks();
  };

  const onClickDeleteTask = (taskId) => {
    delete tasks[taskId];
    window.localStorage.removeItem("tasks"); // ?
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasks();
  };

  const onClickSaveEditedTask = (taskId) => {
    const currentTask = tasks[taskId];
    const editedTaskList = {
      ...tasks,
      [taskId]: { ...currentTask, ...editedTask },
    };
    window.localStorage.setItem("tasks", JSON.stringify(editedTaskList));
    setEditedTaskId("");
    setEditedTask({});
    getTasks();
  };

  const getTasks = () => {
    const taskList = window.localStorage.getItem("tasks") || "{}";
    sortTasksByDate("createdDate", JSON.parse(taskList));
  };

  const sortTasksByDate = (sortMethod, tasks) => {
    setEditedTaskId("");
    if (Object.values(tasks).length > 0) {
      let sortedList = [];
      if (sortMethod === "deadlineDate") {
        sortedList = Object.values({ ...tasks }).sort(sortByDeadlineDate);
      } else {
        sortedList = Object.values({ ...tasks }).sort(sortByCreationDate);
      }

      const taskList = sortedList.reduce(
        (acc, el) => ({ ...acc, [el.id]: el }),
        {}
      );
      setTasks(taskList);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (isOpenModal) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  return (
    <>
      <div className="header">
        <h1>ToDo-list</h1>
        <button className="new-task-button" onClick={openModalHandler}>
          +
        </button>
      </div>

      <SortingByDate
        sortTasksByDate={(method) => sortTasksByDate(method, tasks)}
      />

      {Object.values(tasks).length > 0 ? (
        <ul className="task-list">
          {Object.values(tasks).map((task) =>
            editedTaskId !== task.id ? (
              <TaskItem
                key={task.id}
                task={task}
                checkboxHandler={checkboxHandler}
                setEditedTaskId={setEditedTaskId}
                onClickDeleteTask={onClickDeleteTask}
              />
            ) : (
              <TaskItemEdit
                key={task.id}
                task={task}
                setEditedTask={setEditedTask}
                onClickSaveEditedTask={onClickSaveEditedTask}
                onClickDeleteTask={onClickDeleteTask}
                editedTask={editedTask}
                onClickCancelChanges={() => {
                  setEditedTask({});
                  setEditedTaskId("");
                }}
              />
            )
          )}
        </ul>
      ) : (
        <div className="no-task-message">Дел нет!</div>
      )}

      {isOpenModal && (
        <CreateNewTaskModal
          onCloseModal={openModalHandler}
          updateTaskList={getTasks}
        />
      )}
    </>
  );
};

export default Main;
