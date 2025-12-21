import React, { useState } from "react";

export const SearchInput: React.FC<{
  setSearchValue: (value: string) => void;
  setVisibleTestCount: (value: number) => void;
}> = (props) => {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search test..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.currentTarget.value);
        }}
      />
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          props.setSearchValue(search);
          props.setVisibleTestCount(4);
        }}
      >
        Find
      </button>
    </div>
  );
};
