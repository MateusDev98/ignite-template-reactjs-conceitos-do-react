import { useState, ChangeEvent } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

const changePropFromTask = (tasks: Task[], id: number) => {
  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        isComplete: !task.isComplete,
      };
    }
    return task;
  });
  return newTasks;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEmptyTitle, setEmptyTitle] = useState(false);

  function handleCreateNewTask() {
    if (newTaskTitle) {
      setEmptyTitle(false);
      setNewTaskTitle("");
      return setTasks((prevState) => [
        ...prevState,
        { id: Math.random(), title: newTaskTitle, isComplete: false },
      ]);
    }
    setEmptyTitle(true);
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(changePropFromTask(tasks, id));
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function handleChangeTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (isEmptyTitle) setEmptyTitle(false);
    setNewTaskTitle(event.target.value);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            style={isEmptyTitle ? { outline: "1px solid red" } : {}}
            placeholder="Adicionar novo todo"
            onChange={handleChangeTaskTitle}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
