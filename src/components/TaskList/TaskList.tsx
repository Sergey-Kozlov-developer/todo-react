import { useCallback, useReducer } from "react";
import "./TaskList.scss";

import IconDelete from "../Icon/IconDelete";
import IconEdit from "../Icon/IconEdit";
import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";

interface ITask {
    id: string;
    text: string;
    completed: boolean;
}

type ITaskList = Record<string, ITask>;
type Action = { type: "TOGGLE_TASK"; taskId: string } | {type: "DELETE_TASK"; taskId: string };


const TaskList = () => {
    // начальное состояние
    const initialMockTaskList: ITaskList = {
        one: {
            id: "1",
            text: "Note #1",
            completed: false,
        },
        two: {
            id: "2",
            text: "Note #2",
            completed: true,
        },
        three: {
            id: "3",
            text: "Note #3",
            completed: false,
        },
    };
    // хук принимает в себя ф-цию состояния и начальное состояние
    const [tasks, dispatch] = useReducer(taskReducer, initialMockTaskList);

// ф-ция, которая меняет состояние задачи
    function taskReducer(state: ITaskList, action: Action): ITaskList {
        switch (action.type) {
            case "TOGGLE_TASK":
                return {
                    ...state,
                    [action.taskId]: {
                        ...state[action.taskId],
                        completed: !state[action.taskId].completed,
                    },
                };

            default:
                return state;
        }
    }
    // ф-ция обрабатывает клик
    const toggleTaskCompletion = useCallback((taskId: string) => {
        dispatch({ type: "TOGGLE_TASK", taskId });
    }, []);


    if (Object.keys(tasks).length === 0) {
        return <EmptyBlock />;
    }

    return (
        <div className="task-list">
            <ul className="task-list__items">
                {Object.keys(tasks).map((taskId) => (
                    <li key={taskId} className="task-list__item">
                        <div className="task-list__content">
                            <label className="task-list__checkbox-label">
                                <input
                                    type="checkbox"
                                    className="task-list__checkbox"
                                    checked={tasks[taskId].completed}
                                    onChange={() =>
                                        toggleTaskCompletion(taskId)
                                    }
                                />
                                <span className="task-list__custom-checkbox"></span>
                            </label>

                            <div className="task-list__details">
                                <span
                                    className={`task-list__text ${
                                        tasks[taskId].completed
                                            ? "task-list__text--completed"
                                            : ""
                                    }`}
                                >
                                    {tasks[taskId].text}
                                </span>
                            </div>
                        </div>

                        <div className="task-list__actions">
                            <button
                                className="task-list__edit"
                                aria-label="Edit task"
                            >
                                <IconEdit />
                            </button>

                            <button
                                className="task-list__delete"
                                aria-label="Delete task"
                            >
                                <IconDelete />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
