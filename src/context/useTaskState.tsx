import { createContext, useContext, type PropsWithChildren } from "react";
import { useTaskReducer, type ITask } from "../hook/useTaskReducer";

export const useTaskState = () => useContext(TaskContext);

// интерфейс данных от API
interface IApiResponse {
    todos: Array<{
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
    }>;
    total: number;
    limit: number;
}

interface ITaskContextType {
    taskState: Record<string, ITask>;
    filteredTasks: string[];
    toggleTaskCompletion: (taskId: string) => void;
    handleClickDeleteTask: (taskId: string) => void;
    editTask: (taskId: string, newText: string) => void;
    addTask: (task: ITask) => void;
}

const TaskContext = createContext<ITaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: PropsWithChildren) => {
    // useTaskReducer инициализируем пустым
    const {
        task: taskState,
        filteredTasks,
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
    } = useTaskReducer({});

    const value: ITaskContextType = {
        taskState,
        filteredTasks,
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
};
