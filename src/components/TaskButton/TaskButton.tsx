import type { ReactNode } from "react";

interface ITaskButtonProps {
    icon?: ReactNode;
    text?: string;
    className?: string;
    onClickIcon?: () => void;
}

const TaskButton = ({
    icon,
    onClickIcon,
    className,
    text,
}: ITaskButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClickIcon}
            className={className}
            aria-label="Edit task"
        >
            {icon || text}
        </button>
    );
};

export default TaskButton;
