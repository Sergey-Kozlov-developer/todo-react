import { useCallback, useEffect, useRef, useState } from "react";

import TaskItemEditing from "./TaskItemEditing";
import TaskItemStable from "./TaskItemStable";

interface ITaskItemProps {
    taskId: number;
    isCheck: boolean;
    toggleCompleted: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
    editTask: (taskId: number, todo: string) => void;
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
        console.log(111);

        // toggleCompleted(taskId);
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
                {isEditedTask ? (
                    <TaskItemEditing
                        onClickSave={handleSaveEdit}
                        onClickCancel={handleCancelEdit}
                        onChangeText={(e) => setEditText(e.target.value)}
                        editText={editText}
                        inputRef={inputRef}
                    />
                ) : (
                    <TaskItemStable
                        text={text}
                        onClickEdit={handleStartEdit}
                        onClickDelete={handleClickDelete}
                        completed={completed}
                    />
                )}
            </div>
        </li>
    );
};

export default TaskItem;
