import { useCallback, useState } from "react";
import "./Filter.scss";
import IconSelect from "../Icon/IconSelect";
import { FilterListEnum } from "../../enums/filterListEnum";
import FilterList from "../FilterList/FilterList";
import { useTaskFilterState } from "../../context/useTaskFilterState";

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    // вытаскиваем из нашего хука useSearchState
    const { filterType, setFilterType } = useTaskFilterState();

    // получаем массив значений из enum
    const list = Object.values(FilterListEnum);

    const handleSelect = useCallback(
        (item: FilterListEnum) => {
            setFilterType(item);
            setIsOpen(false);
        },
        [setFilterType]
    );

    return (
        <div className="select">
            <button
                className="select__button"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className="select__value">{filterType}</span>
                <span
                    className={`select__icon ${
                        isOpen ? "select__icon--rotated" : ""
                    }`}
                >
                    <IconSelect />
                </span>
            </button>
            {isOpen && (
                <ul className="select__list">
                    {list.map((item) => (
                        <FilterList
                            key={item}
                            item={item}
                            isSelected={filterType === item}
                            onSelect={() => handleSelect(item)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Filter;
