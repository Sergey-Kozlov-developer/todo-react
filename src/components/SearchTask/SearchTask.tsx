import "./SearchTask.scss";

const SearchTask = () => {
	return (
		<form className="search-task">
			<div className="search-task__wrapper">
				<input
					id="search-task"
					type="text"
					className="search-task__input"
					placeholder="Search note..."
					autoComplete="off"
				/>
			</div>
		</form>
	);
};

export default SearchTask;
