// import type React from "react";
import { useCallback, useRef, useState } from "react";
import TaskButton from "../TaskButton/TaskButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import type { ITask } from "../../hook/useReducerHook";
import throttle from "lodash.throttle";

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

    /**
     * создаем throttleInput и в него прокидываем throttle
     * throttle ф-ция задается с промежутком времени, который гарантирует, что
     * за заданное время она вызовется только 1 раз
     */
    const throttleInput = useRef(throttle((value) => setInputText(value), 250));

    const handleChangeInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            throttleInput.current(value);
        },
        []
    );

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
                            onChange={handleChangeInput}
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
