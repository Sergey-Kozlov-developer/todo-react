import type { FilterListEnum } from "../../enums/filterListEnum";

interface FilterListProps {
    item: FilterListEnum;
    isSelected: boolean;
    onSelect: (item: FilterListEnum) => void;
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
