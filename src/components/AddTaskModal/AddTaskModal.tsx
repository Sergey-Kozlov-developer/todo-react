import type React from "react";

interface AddTaskModalProps {
    onClose: () => void;
}

const AddTaskModal = ({ onClose }: AddTaskModalProps) => {
    // клик вне окна
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <h2 className="modal__title">New Note</h2>
                <form className="modal__form">
                    <input
                        id="search-task"
                        type="text"
                        className="modal__input"
                        placeholder="Input your note..."
                        autoComplete="off"
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
                    <button type="button" className="modal__button color">
                        apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
