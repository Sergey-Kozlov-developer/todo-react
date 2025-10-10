import type { SortListEnum } from "../../enums/sortListEnum";

interface FilterListProps {
    item: SortListEnum;
    isSelected: boolean;
    onSelect: (item: SortListEnum) => void;
}

const FilterList = ({ item, isSelected, onSelect }: FilterListProps) => {
    const handleClick = () => {
        onSelect(item);
    };
    return (
        <li
            key={item}
            className={`select__item ${
                isSelected ? "select__item--active" : ""
            }`}
            onClick={handleClick}
        >
            {item}
        </li>
    );
};

export default FilterList;
