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
    | { type: "DELETE_TASK"; taskId: string };

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

        default:
            return state;
    }
}

const TaskList = () => {
    // хук принимает в себя ф-цию состояния и начальное состояние
    const [state, dispatch] = useReducer(taskReducer, initialMockTaskList);
    // ф-ция обрабатывает клик
    const toggleTaskCompletion = useCallback((taskId: string) => {
        dispatch({ type: "TOGGLE_TASK", taskId });
    }, []);

    if (Object.keys(state).length === 0) {
        return <EmptyBlock />;
    }

    return (
        <div className="task-list">
            <ul className="task-list__items">
                {Object.keys(state).map((taskId) => (
                    <TaskItem
                        taskId={taskId}
                        isCheck={state[taskId].completed}
                        toggleCompleted={() => toggleTaskCompletion(taskId)}
                        completed={state[taskId].completed}
                        text={state[taskId].text}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
