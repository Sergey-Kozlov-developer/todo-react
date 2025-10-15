import { useContext } from "react";
import IconSearch from "../Icon/IconSearch";
import "./SearchField.scss";
import { SearchContext } from "../../App";

const SearchField = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    return (
        <div className="search-task">
            <input
                id="search-task"
                type="text"
                className="search-task__input"
                placeholder="Search note..."
                autoComplete="off"
                value={searchValue}
                onChange={handelChange}
            />

            <button className="search-task__button" type="button">
                <IconSearch />
            </button>
        </div>
    );
};

export default SearchField;
