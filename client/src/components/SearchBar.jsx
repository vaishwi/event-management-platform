import React from "react";
import "../styles/searchPage.css";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";

const SearchBar = ({ searchValue, setSearchValue, handleSearch }) => {
  const handleClearBtn = () => {
    setSearchValue("");
  };

  return (
    <div className="container">
      <div className="input-wrap">
        <AiOutlineSearch size={30} />
        <input
          onChange={(newSearchValue) => {
            setSearchValue(newSearchValue);
          }}
          onClick={() => handleSearch()}
          value={searchValue}
          type="text"
          name="search-query"
          id="search-query"
          placeholder="Search anything"
        />
        <MdClear onClick={handleClearBtn} size={25} />
      </div>
    </div>
  );
};

export default SearchBar;
