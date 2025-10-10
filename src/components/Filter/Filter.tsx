import { useCallback, useState } from "react";
import "./Filter.scss";
import IconSelect from "../Icon/IconSelect";
import { SortListEnum } from "../../enums/sortListEnum";
import FilterList from "../FilterList/FilterList";

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(SortListEnum.ALL);

    // получаем массив значений из enum
    const list = Object.values(SortListEnum);

    const handleSelect = useCallback((item: SortListEnum) => {
        setSelectedItem(item);
        setIsOpen(false);
    }, []);

    return (
        <div className="select">
            <button
                className="select__button"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className="select__value">{selectedItem}</span>
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
                            isSelected={selectedItem === item}
                            onSelect={() => handleSelect(item)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Filter;
