import IconSearch from "../Icon/IconSearch";
import "./SearchField.scss";

import { useSearchState } from "../../context/useSearchState";
import debounce from "lodash.debounce";
import { useRef } from "react";

const SearchField = () => {
    const { setSearchQuery } = useSearchState();
    /**
     * создаем ф-цию, которую обрабатывает debounce
     * принимает value и отображает поиск через 500 мс
     */
    const debounceSearch = useRef(
        debounce((value: string) => {
            console.log("value", value);
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
