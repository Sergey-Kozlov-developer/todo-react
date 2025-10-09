import toogleTheme from "../../assets/images/icon-theme.svg";

const ToggleTheme = () => {
	return (
		<div className="theme-toggle">
			<button type="button" className="theme-toggle__button">
				<img src={toogleTheme} alt="" />
			</button>
		</div>
	);
};

export default ToggleTheme;
