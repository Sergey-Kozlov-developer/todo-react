import { type Ref } from "react";
import IconCancel from "../Icon/IconCancel";
import IconSave from "../Icon/IconSave";
import TaskButton from "../TaskButton/TaskButton";

interface ITaskItemEditingProps {
    onClickSave: () => void;
    onClickCancel: () => void;
    onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editText: string;
    inputRef: Ref<HTMLInputElement>;
}

const TaskItemEditing = ({
    onClickSave,
    onClickCancel,
    onChangeText,
    editText,
    inputRef,
}: ITaskItemEditingProps) => {
    return (
        <div className="task-list__details">
            <input
                ref={inputRef}
                value={editText}
                onChange={onChangeText}
                type="text"
                name="Edit"
                placeholder="Edit text"
            />
            <div className="task-list__actions">
                <TaskButton
                    className="task-list__edit"
                    icon={<IconSave />}
                    onClickIcon={onClickSave}
                />
                <TaskButton
                    className="task-list__delete"
                    icon={<IconCancel />}
                    onClickIcon={onClickCancel}
                />
            </div>
        </div>
    );
};

export default TaskItemEditing;
