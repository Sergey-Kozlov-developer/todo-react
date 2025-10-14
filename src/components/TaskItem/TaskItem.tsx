import IconDelete from "../Icon/IconDelete";
import IconEdit from "../Icon/IconEdit";

interface ITaskItemProps {
    taskId: string;
    isCheck: boolean;
    toggleCompleted: (taskId: string) => void;
    completed: boolean;
    text: string;
}

const TaskItem = ({
    isCheck,
    toggleCompleted,
    taskId,
    completed,
    text,
}: ITaskItemProps) => {
    const handleChange = () => {
        toggleCompleted(taskId);
    };
    return (
        <li className="task-list__item">
            <div className="task-list__content">
                <label className="task-list__checkbox-label">
                    <input
                        type="checkbox"
                        className="task-list__checkbox"
                        checked={isCheck}
                        onChange={handleChange}
                    />
                    <span className="task-list__custom-checkbox"></span>
                </label>

                <div className="task-list__details">
                    <span
                        className={`task-list__text ${
                            completed ? "task-list__text--completed" : ""
                        }`}
                    >
                        {text}
                    </span>
                </div>
            </div>

            <div className="task-list__actions">
                <button className="task-list__edit" aria-label="Edit task">
                    <IconEdit />
                </button>

                <button className="task-list__delete" aria-label="Delete task">
                    <IconDelete />
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
