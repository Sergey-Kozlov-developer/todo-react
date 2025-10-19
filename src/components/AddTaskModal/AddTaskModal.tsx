// import type React from "react";
import { useState } from "react";
import TaskButton from "../TaskButton/TaskButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import type { ITask } from "../../hook/useReducerHook";
interface AddTaskModalProps {
    onClose: () => void;
    addTask: (task: ITask) => void;
}

const AddTaskModal = ({ onClose, addTask }: AddTaskModalProps) => {
    const [inputText, setInputText] = useState("");
    // клик вне окна
    const handleClickAway = () => {
        onClose();
    };
    /**
     * добавление новой задачи
     * если поле ввода не пустое, то создаем новый объект задачи
     */
    const handleSubmit = () => {
        if (inputText.trim()) {
            const newTask: ITask = {
                id: Date.now().toString(),
                text: inputText.toString(),
                completed: false,
                timestamp: new Date(),
            };

            addTask(newTask);
            setInputText("");
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="modal">
                    <h2 className="modal__title">New Note</h2>
                    <form className="modal__form">
                        <input
                            id="add-task"
                            type="text"
                            className="modal__input"
                            placeholder="Input your note..."
                            autoComplete="off"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </form>
                    <div className="modal__actions">
                        <TaskButton
                            icon={undefined}
                            onClickIcon={onClose}
                            className="modal__button"
                            text="cancel"
                        />
                        <TaskButton
                            onClickIcon={handleSubmit}
                            className="modal__button color"
                            text="apply"
                        />
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default AddTaskModal;
