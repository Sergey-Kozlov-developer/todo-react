import { noop } from "es-toolkit/function";
import {
    createContext,
    useCallback,
    useContext,
    useReducer,
    type PropsWithChildren,
} from "react";
// import { useTaskFilterState } from "./useTaskFilterState";
import { v6 as uuidv6 } from "uuid";
import { ApiService } from "../api/apiService";

export const useTaskState = () => useContext(TaskContext);

export interface ITask {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

interface ITaskContextType {
    taskState: ITask[];
    filteredTasks: string[];
    toggleTaskCompletion: (taskId: number) => void;
    handleClickDeleteTask: (taskId: number) => void;
    editTask: (taskId: number, todo: string) => void;
    addTask: (task: ITask) => void;
    setTasks: (tasks: ITask[]) => void;
}

const TaskContext = createContext<ITaskContextType>({
    taskState: [],
    filteredTasks: [],
    toggleTaskCompletion: noop,
    handleClickDeleteTask: noop,
    editTask: noop,
    addTask: noop,
    setTasks: noop,
});
type Action =
    | { type: "TOGGLE_TASK"; taskId: number }
    | { type: "DELETE_TASK"; taskId: number }
    | { type: "EDIT_TASK"; taskId: number; todo: string }
    | { type: "ADD_TASK"; task: ITask }
    | { type: "SET_TASKS"; tasks: ITask[] };
// ф-ция, которая меняет состояние задачи
function taskReducer(state: ITask[], action: Action): ITask[] {
    switch (action.type) {
        case "SET_TASKS":
            return action.tasks;
        case "TOGGLE_TASK":
            // создаем новый объект
            // возвращаем новое состояние на основе предыдущего
            // при dispatch определенного action
            return state.map((task) =>
                task.id === action.taskId
                    ? { ...task, completed: !task.completed }
                    : task
            );
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
                    ...state[action.taskId],
                    todo: action.todo,
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
                    todo: action.task.todo,
                    completed: action.task.completed,
                },
            };
        }

        default:
            return state;
    }
}

export const TaskProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(taskReducer, []);
    // получение состояния поиска и фильтрации из хука useTaskFilterState()
    // const { searchQuery, filterType } = useTaskFilterState();
    //получение задач с API
    const setTasks = useCallback((tasks: ITask[]) => {
        dispatch({ type: "SET_TASKS", tasks });
    }, []);
    // ф-ция обрабатывает клик по checkbox
    const toggleTaskCompletion = useCallback(async (task: ITask) => {
        try {
            const updateTask = await ApiService.update(task);
            dispatch({ type: "TOGGLE_TASK", taskId: task.id });
            return updateTask;
        } catch (error) {}
    }, []);
    // ф-ция обрабатывает клик по иконке удаления
    const handleClickDeleteTask = useCallback((taskId: number) => {
        dispatch({ type: "DELETE_TASK", taskId });
    }, []);
    // редактирование задачи
    const editTask = useCallback((taskId: number, todo: string) => {
        dispatch({ type: "EDIT_TASK", taskId, todo });
    }, []);

    // добавление задачи
    const addTask = useCallback((task: ITask) => {
        dispatch({ type: "ADD_TASK", task });
    }, []);
    // const setAllTask = (tasks: ITask[])

    const value: ITaskContextType = {
        taskState: state,
        filteredTasks: [],
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
        setTasks,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
};
