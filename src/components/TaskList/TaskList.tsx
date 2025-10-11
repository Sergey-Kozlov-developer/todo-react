import { useCallback, useState } from "react";
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

const TaskList = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const mockTaskList: ITaskList = {
        abc: {
            id: "1",
            text: "Note #1",
            completed: false,
        },
        cde: {
            id: "2",
            text: "Note #2",
            completed: true,
        },
        fg: {
            id: "3",
            text: "Note #3",
            completed: false,
        },
    };

    // const toggleTaskCompletion = useCallback(
    //     (taskId: string) => {
    //         console.log(taskId);

    //         mockTaskList[taskId].completed = false;
    //         // mockTaskList[taskId].completed = !mockTaskList[taskId].completed;
    //     },
    //     [tasks]
    // );
    const toggleTaskCompletion = (taskId: string) => {
        console.log(taskId);

        mockTaskList[taskId].completed = false;
        // mockTaskList[taskId].completed = !mockTaskList[taskId].completed;
    };

    // if (tasks.length === 0) {
    //     return <EmptyBlock />;
    // }
    console.log(Object.keys(mockTaskList));

    return (
        <div className="task-list">
            <ul className="task-list__items">
                {Object.keys(mockTaskList).map((taskId) => (
                    <li key={taskId} className="task-list__item">
                        <div className="task-list__content">
                            <label className="task-list__checkbox-label">
                                <input
                                    type="checkbox"
                                    className="task-list__checkbox"
                                    checked={mockTaskList[taskId].completed}
                                    onChange={() =>
                                        toggleTaskCompletion(taskId)
                                    }
                                />
                                <span className="task-list__custom-checkbox"></span>
                            </label>

                            <div className="task-list__details">
                                <span
                                    className={`task-list__text ${
                                        mockTaskList[taskId].completed
                                            ? "task-list__text--completed"
                                            : ""
                                    }`}
                                >
                                    {mockTaskList[taskId].text}
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
