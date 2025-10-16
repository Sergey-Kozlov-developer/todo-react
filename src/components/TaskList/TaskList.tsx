import { useCallback, useReducer, useState } from "react";
import "./TaskList.scss";
import { v6 as uuidv6 } from "uuid";

import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";
import AddTaskModal from "../AddTaskModal/AddTaskModal.tsx";
import TaskButton from "../TaskButton/TaskButton.tsx";
import IconPlus from "../Icon/IconPlus.tsx";
import { useTaskFilterState } from "../../context/useTaskFilterState.tsx";
import { FilterListEnum } from "../../enums/filterListEnum.ts";

export interface ITask {
    id: string;
    text: string;
    completed: boolean;
    timestamp: Date;
}

type ITaskList = Record<string, ITask>;
type Action =
    | { type: "TOGGLE_TASK"; taskId: string }
    | { type: "DELETE_TASK"; taskId: string }
    | { type: "EDIT_TASK"; taskId: string; newText: string }
    | { type: "ADD_TASK"; task: ITask };

// начальное состояние
const initialMockTaskList: ITaskList = {
    one: {
        id: "1",
        text: "Note #1",
        completed: false,
        timestamp: new Date(),
    },
    two: {
        id: "2",
        text: "Note #2",
        completed: true,
        timestamp: new Date(),
    },
    three: {
        id: "3",
        text: "Note #3",
        completed: false,
        timestamp: new Date(),
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

        case "ADD_TASK": {
            // устанавливаем уникальный id
            const newTaskId = `task-${uuidv6()}`;

            return {
                ...state,
                // создаем объект новой задачи
                [newTaskId]: {
                    id: action.task.id,
                    text: action.task.text,
                    completed: action.task.completed,
                    timestamp: action.task.timestamp,
                },
            };
        }

        default:
            return state;
    }
}

const TaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // хук принимает в себя ф-цию состояния и начальное состояние
    const [state, dispatch] = useReducer(taskReducer, initialMockTaskList);

    // вытаскиваем searchQuery и sortType из нашего хука контекста
    const { searchQuery, filterType } = useTaskFilterState();

    // ф-ция обрабатывает клик по checkbox
    const toggleTaskCompletion = useCallback((taskId: string) => {
        dispatch({ type: "TOGGLE_TASK", taskId });
    }, []);

    // ф-ция обрабатывает клик по иконке удаления
    const handleClickDeleteTask = useCallback((taskId: string) => {
        dispatch({ type: "DELETE_TASK", taskId });
    }, []);

    // редактирование задачи
    const editTask = useCallback((taskId: string, newText: string) => {
        dispatch({ type: "EDIT_TASK", taskId, newText });
    }, []);

    // добавление задачи
    const addTask = useCallback((task: ITask) => {
        dispatch({ type: "ADD_TASK", task });
    }, []);

    // поиск объект с задачами по значению text
    const searchedTasks = Object.keys(state).filter((taskId) => {
        return state[taskId].text
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    });

    // фильтрация по ALL, Complete, Incomplete
    const filteredTasks = searchedTasks.filter((taskId) => {
        const task = state[taskId];
        switch (filterType) {
            case FilterListEnum.COMPLETE:
                return task.completed;
            case FilterListEnum.INCOMPLETE:
                return !task.completed;
            case FilterListEnum.ALL:
            default:
                return true;
        }
    });

    if (filteredTasks.length === 0) {
        return <EmptyBlock />;
    }

    return (
        <>
            <div className="task-list">
                <ul className="task-list__items">
                    {filteredTasks.map((taskId) => (
                        <TaskItem
                            key={taskId}
                            taskId={taskId}
                            isCheck={state[taskId].completed}
                            toggleCompleted={() => toggleTaskCompletion(taskId)}
                            completed={state[taskId].completed}
                            text={state[taskId].text}
                            deleteTask={() => handleClickDeleteTask(taskId)}
                            editTask={editTask}
                        />
                    ))}
                </ul>
            </div>
            <div className="todo add-task">
                <TaskButton
                    className="add-task__button"
                    icon={<IconPlus />}
                    onClickIcon={() => setIsModalOpen(true)}
                />
            </div>
            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    addTask={addTask}
                />
            )}
        </>
    );
};

export default TaskList;
