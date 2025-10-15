import type { ReactNode } from "react";

interface ITaskButtonProps {
    icon: ReactNode;
    className?: string;
    onClickIcon: () => void;
}

const TaskButton = ({ icon, onClickIcon, className }: ITaskButtonProps) => {
    return (
        <button
            onClick={onClickIcon}
            className={className}
            aria-label="Edit task"
        >
            {icon}
        </button>
    );
};

export default TaskButton;
