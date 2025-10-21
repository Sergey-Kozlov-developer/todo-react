import TaskButton from "../TaskButton/TaskButton";
import IconEdit from "../Icon/IconEdit";
import IconDelete from "../Icon/IconDelete";

interface ITaskItemStableProps {
    text: string;
    completed: boolean;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

const TaskItemStable = ({
    text,
    completed,
    onClickEdit,
    onClickDelete,
}: ITaskItemStableProps) => {
    return (
        <div className="task-list__details">
            <span
                className={`task-list__text ${
                    completed ? "task-list__text--completed" : ""
                }`}
            >
                {text}
            </span>
            <div className="task-list__actions">
                <TaskButton
                    className="task-list__edit"
                    icon={<IconEdit />}
                    onClickIcon={onClickEdit}
                />
                <TaskButton
                    className="task-list__delete"
                    icon={<IconDelete />}
                    onClickIcon={onClickDelete}
                />
            </div>
        </div>
    );
};

export default TaskItemStable;
