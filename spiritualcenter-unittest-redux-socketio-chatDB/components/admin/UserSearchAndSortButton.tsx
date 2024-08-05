"use client";

import { useState } from "react";
import { IUser } from "@/lib/helpers/interfaces";
import { handleAscending, handleDescending, handleSearch } from "@/lib/helpers/helperFunctions";

const UserSearchSortButtons = ({ users, setUsers, allUsers }: { users: IUser[]; setUsers: React.Dispatch<React.SetStateAction<IUser[]>>; allUsers: IUser[]; }) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="m-5 flex flex-col md:flex-row gap-5 md:justify-center items-center">
      <div className="flex flex-col mb-1 md:mb-0">
        <button
          type="button"
          onClick={() => handleAscending({ users, setUsers })}
          className="px-3 bg-slate-300 rounded-t hover:bg-slate-400"
          id="sortByAsc"
        >
          ⏫️ Ascending
        </button>
        <button
          type="button"
          onClick={() => handleDescending({ users, setUsers })}
          className="px-3 bg-slate-300 rounded-b hover:bg-slate-400"
          id="sortByDesc"
        >
          ⏬ Descending
        </button>
      </div>
      <div className="flex mt-1 md:mt-0 border border-black">
        <input
          type="text"
          name="searchInput"
          autoFocus
          className="bg-slate-200 caret-red-800"
          defaultValue={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          id="searchInput"
        />
        <button
          id="searchBtn"
          className="md:px-4 px-2 md:py-3 bg-slate-300 hover:bg-slate-400 border-l-2 border-black"
          onClick={() =>
            handleSearch({ searchInput, users, setUsers, allUsers })
          }
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default UserSearchSortButtons;
