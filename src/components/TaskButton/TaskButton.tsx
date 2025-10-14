import type { ReactNode } from "react";

interface ITaskButtonProps {
    icon: ReactNode;
    className?: string;
    onClickIcon: () => void;
}

const TaskButton = ({ icon, onClickIcon, className }: ITaskButtonProps) => {
    return (
        // <div className="task-list__actions">
        <button
            onClick={onClickIcon}
            className={className}
            aria-label="Edit task"
        >
            {icon}
        </button>
        // </div>
    );
};

export default TaskButton;
