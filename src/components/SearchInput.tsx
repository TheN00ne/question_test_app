import React, { useState } from "react";
import "../styles/styles.scss";

export const SearchInput: React.FC<{
  setSearchValue: (value: string) => void;
  setVisibleTestCount: (value: number) => void;
}> = (props) => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={"search"}>
      <input
        className={"searchLine"}
        type="text"
        placeholder="Search test..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.currentTarget.value);
        }}
      />
      <button
        className={"searchBtn"}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          props.setSearchValue(search);
          props.setVisibleTestCount(4);
        }}
      >
        <svg
          className={"searchBtnIcon"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fill="#ffffff"
            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
    </div>
  );
};
