import emptyImage from "../../assets/images/image-empty.png";

const EmptyBlock = () => {
	return (
		<div className="empty-block">
			<img className="empty-block__img" src={emptyImage} alt="Empty" />
			<h3 className="empty-block__text">Empty...</h3>
		</div>
	);
};

export default EmptyBlock;
