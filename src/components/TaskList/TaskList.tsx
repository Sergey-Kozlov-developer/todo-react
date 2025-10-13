import { useCallback, useReducer } from "react";
import "./TaskList.scss";

import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";

interface ITask {
    id: string;
    text: string;
    completed: boolean;
}

type ITaskList = Record<string, ITask>;
type Action =
    | { type: "TOGGLE_TASK"; taskId: string }
    | { type: "DELETE_TASK"; taskId: string }
    | { type: "EDIT_TASK"; taskId: string; newText: string };

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

// ф-ция, которая меняет состояние задачи
function taskReducer(state: ITaskList, action: Action): ITaskList {
    switch (action.type) {
        case "TOGGLE_TASK":
            // создаем новый объект
            // возвращаем новое состояние на основе предыдущего
            // при dispatch определенного action
            return {
                ...state, // текущий state
                [action.taskId]: {
                    ...state[action.taskId],
                    completed: !state[action.taskId].completed,
                },
            };
        case "DELETE_TASK": {
            // записываем в переменную текущий state
            const newState = { ...state };
            /**
             * удаляем из объекта initialMockTaskList id задачи!! - taskId
             *  не путаем taskId(id самой задачи объекта initialMockTaskList )
             * и id(это внутри объекта самой задачи)
             */
            delete newState[action.taskId];
            return newState;
        }
        case "EDIT_TASK":
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.newText],
                    text: action.newText,
                },
            };

        default:
            return state;
    }
}

const TaskList = () => {
    // хук принимает в себя ф-цию состояния и начальное состояние
    const [state, dispatch] = useReducer(taskReducer, initialMockTaskList);
    // ф-ция обрабатывает клик по checkbox
    const toggleTaskCompletion = useCallback((taskId: string) => {
        dispatch({ type: "TOGGLE_TASK", taskId });
    }, []);
    // ф-ция обрабатывает клик по иконки удаления
    const handleClickDeleteTask = useCallback((taskId: string) => {
        dispatch({ type: "DELETE_TASK", taskId });
    }, []);

    if (Object.keys(state).length === 0) {
        return <EmptyBlock />;
    }

    return (
        <div className="task-list">
            <ul className="task-list__items">
                {Object.keys(state).map((taskId) => (
                    <TaskItem
                        key={taskId}
                        taskId={taskId}
                        isCheck={state[taskId].completed}
                        toggleCompleted={() => toggleTaskCompletion(taskId)}
                        completed={state[taskId].completed}
                        text={state[taskId].text}
                        deleteTask={() => handleClickDeleteTask(taskId)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
