import IconSearch from "../Icon/IconSearch";
import "./SearchField.scss";

const SearchField = () => {
    return (
        <div className="search-task">
            <input
                id="search-task"
                type="text"
                className="search-task__input"
                placeholder="Search note..."
                autoComplete="off"
            />

            <button className="search-task__button" type="button">
                <IconSearch />
            </button>
        </div>
    );
};

export default SearchField;
