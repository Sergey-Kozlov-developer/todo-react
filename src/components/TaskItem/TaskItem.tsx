import { useCallback, useEffect, useRef, useState } from "react";
import IconDelete from "../Icon/IconDelete";
import IconEdit from "../Icon/IconEdit";
import IconSave from "../Icon/IconSave";
import IconCancel from "../Icon/IconCancel";
import TaskButton from "../TaskButton/TaskButton";
// import AddTaskModal from "../AddTaskModal/AddTaskModal";

interface ITaskItemProps {
    taskId: string;
    isCheck: boolean;
    toggleCompleted: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
    editTask: (taskId: string, newText: string) => void;
    completed: boolean;
    text: string;
}

const TaskItem = ({
    isCheck,
    toggleCompleted,
    deleteTask,
    editTask,
    taskId,
    completed,
    text,
}: ITaskItemProps) => {
    const [isEditedTask, setIsEditedTask] = useState(false);
    const [editText, setEditText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(() => {
        toggleCompleted(taskId);
    }, []);
    const handleClickDelete = useCallback(() => {
        deleteTask(taskId);
    }, []);
    // при клике ставим текущий текст
    const handleStartEdit = useCallback(() => {
        setEditText(text);
        setIsEditedTask(true);
    }, []);
    // сохранение текста задачи
    const handleSaveEdit = useCallback(() => {
        if (editText.trim() !== "") {
            editTask(taskId, editText.trim());
        }
        setIsEditedTask(false);
    }, [editText]);
    // отмена сохранения
    const handleCancelEdit = useCallback(() => {
        setEditText("");
        setIsEditedTask(false);
    }, []);
    // делаем фокус на input при редактировании
    useEffect(() => {
        if (isEditedTask) {
            inputRef.current?.focus();
        }
    }, [isEditedTask]);

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
                    {isEditedTask ? (
                        <input
                            ref={inputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            type="text"
                            name="Edit"
                            placeholder="Edit text"
                        />
                    ) : (
                        <span
                            className={`task-list__text ${
                                completed ? "task-list__text--completed" : ""
                            }`}
                        >
                            {text}
                        </span>
                    )}
                </div>
            </div>

            {isEditedTask ? (
                <div className="task-list__actions">
                    <TaskButton
                        className="task-list__edit"
                        icon={<IconSave />}
                        onClickIcon={handleSaveEdit}
                    />
                    <TaskButton
                        className="task-list__delete"
                        icon={<IconCancel />}
                        onClickIcon={handleCancelEdit}
                    />
                </div>
            ) : (
                <div className="task-list__actions">
                    <TaskButton
                        className="task-list__edit"
                        icon={<IconEdit />}
                        onClickIcon={handleStartEdit}
                    />
                    <TaskButton
                        className="task-list__delete"
                        icon={<IconDelete />}
                        onClickIcon={handleClickDelete}
                    />
                </div>
            )}
        </li>
    );
};

export default TaskItem;
