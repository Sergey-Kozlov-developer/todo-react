import type React from "react";
import { useState } from "react";
import type { ITask } from "../TaskList/TaskList";

interface AddTaskModalProps {
    onClose: () => void;
    addTask: (task: ITask) => void;
}

const AddTaskModal = ({ onClose, addTask }: AddTaskModalProps) => {
    const [inputText, setInputText] = useState("");
    // клик вне окна
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
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
        <div className="modal-overlay" onClick={handleOverlayClick}>
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
                    <button
                        type="button"
                        onClick={onClose}
                        className="modal__button"
                    >
                        cancel
                    </button>
                    <button
                        type="button"
                        className="modal__button color"
                        onClick={handleSubmit}
                    >
                        apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
