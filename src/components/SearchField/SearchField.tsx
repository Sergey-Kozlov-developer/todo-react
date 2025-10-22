import IconSearch from "../Icon/IconSearch";
import "./SearchField.scss";

import { useTaskFilterState } from "../../context/useTaskFilterState";
import { debounce } from "es-toolkit/function";
import { useRef } from "react";

const SearchField = () => {
    const { setSearchQuery } = useTaskFilterState();
    /**
     * создаем ф-цию, которую обрабатывает debounce
     * принимает value и отображает поиск через 500 мс
     */
    const debounceSearch = useRef(
        debounce((value: string) => {
            setSearchQuery(value);
        }, 500)
    );

    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debounceSearch.current(value);
    };

    return (
        <div className="search-task">
            <input
                id="search-task"
                type="text"
                className="search-task__input"
                placeholder="Search note..."
                autoComplete="off"
                onChange={handelChange}
            />

            <button className="search-task__button" type="button">
                <IconSearch />
            </button>
        </div>
    );
};

export default SearchField;
