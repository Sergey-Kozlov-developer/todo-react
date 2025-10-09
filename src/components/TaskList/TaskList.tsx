import { useState } from "react";
import "./TaskList.scss";

import editIcon from "../../assets/images/icon-edit.svg";
import deleteIcon from "../../assets/images/icon-delete.svg";

interface Task {
	id: string;
	text: string;
	completed: boolean;
}

const TaskList = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			text: "Note #1",
			completed: false,
		},
		{
			id: "2",
			text: "Note #2",
			completed: false,
		},
		{
			id: "3",
			text: "Note #3",
			completed: false,
		},
	]);

	const toggleTaskCompletion = (taskId: string) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	return (
		<div className="task-list">
			<ul className="task-list__items">
				{/* del */}
				{tasks.map((task) => (
					<li key={task.id} className="task-list__item">
						<div className="task-list__content">
							<label className="task-list__checkbox-label">
								<input
									type="checkbox"
									className="task-list__checkbox"
									checked={task.completed}
									onChange={() =>
										toggleTaskCompletion(task.id)
									}
								/>
								<span className="task-list__custom-checkbox"></span>
							</label>

							<div className="task-list__details">
								<span
									className={`task-list__text ${
										task.completed
											? "task-list__text--completed"
											: ""
									}`}
								>
									{task.text}
								</span>
							</div>
						</div>

						<div className="task-list__actions">
							<button
								className="task-list__edit"
								aria-label="Edit task"
							>
								<img src={editIcon} />
							</button>

							<button
								className="task-list__delete"
								aria-label="Delete task"
							>
								<img src={deleteIcon} />
							</button>
						</div>
					</li>
				))}
			</ul>
			<button>+</button>
		</div>
	);
};

export default TaskList;
