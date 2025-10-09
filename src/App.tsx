import SearchTask from "./components/SearchTask";
import SelectButton from "./components/SelectButton";
import TaskList from "./components/TaskList";
import ToggleTheme from "./components/ToggleTheme";

import iconPlus from "./assets/images/icon-plus.svg";
import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className="todo container">
			<h1 className="todo__title">TODO LIST</h1>
			<form className="todo__form">
				<SearchTask />
				<SelectButton />
				<ToggleTheme />
			</form>
			<TaskList />
			<div className="todo add-task">
				<button
					className="add-task__button"
					onClick={() => setIsModalOpen(true)}
				>
					<img src={iconPlus} alt="Add task" />
				</button>
			</div>
			<AddTaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
}

export default App;
