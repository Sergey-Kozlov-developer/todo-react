import { useState } from "react";
import "./SelectButton.scss";

const SelectButton = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("ALL");

	const list = [
		{ name: "ALL", sortProperty: "all" },
		{ name: "Complete", sortProperty: "complete" },
		{ name: "Incomplete", sortProperty: "incomplete" },
	];

	const handleSelect = (item) => {
		setSelected(item.name);
		setOpen(false);
	};

	return (
		<div className="select">
			<button
				className="select__button"
				onClick={() => setOpen(!open)}
				type="button"
			>
				<span className="select__value">{selected}</span>
				<span
					className={`select__icon ${
						open ? "select__icon--rotated" : ""
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</span>
			</button>
			{open && (
				<ul className="select__list">
					{list.map((item) => (
						<li
							key={item.name}
							className={`select__item ${
								selected === item.name
									? "select__item--active"
									: ""
							}`}
							onClick={() => handleSelect(item)}
						>
							{item.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SelectButton;
