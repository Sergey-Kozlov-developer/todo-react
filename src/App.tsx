import SearchTask from "./components/SearchTask";
import SelectButton from "./components/SelectButton";
import TaskList from "./components/TaskList";
import ToggleTheme from "./components/ToggleTheme";

function App() {
	return (
		<div className="todo container">
			<h1 className="todo__title">TODO LIST</h1>
			<form className="todo__form">
				<SearchTask />
				<SelectButton />
				<ToggleTheme />
			</form>
			<TaskList />
		</div>
	);
}

export default App;
