"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/lib/helpers/interfaces";
import { handleAscending, handleDescending, handleSearch } from "@/lib/helpers/helperFunctions";
import { getSingleUserData, getUserNames } from "@/lib/helpers/action";

interface IDBSearchResult {
  _id: string
  fullName: {
    firstName: string,
    middleName: string,
    lastName: string
  }
}

const UserSearchSortButtons = ({ users, setUsers, allUsers }: { users: IUser[]; setUsers: React.Dispatch<React.SetStateAction<IUser[]>>; allUsers: IUser[]; }) => {
  const [searchInput, setSearchInput] = useState("");
  const [dbNames, setDbNames] = useState<IDBSearchResult[]>([])

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      if (searchInput.trim() == "") {
        setDbNames([])
        return
      }
      if (searchInput) {
        const data = await getUserNames(searchInput)
        setDbNames(data?.userNames)
      } else {
        setDbNames([])
      }
    }, 2000);
    return () => {
      clearTimeout(timeoutID)
    }
  }, [searchInput])

  const handleDBSearch = async () => {
    const userFromDb = await getSingleUserData(searchInput)
    const setUser = JSON.parse(userFromDb!)
    setUsers(setUser)
  }

  const handleDynamicSearch = () => {
    users.map((username) => {
      const fName = username.fullName.firstName
      if (fName !== searchInput) {
        return handleDBSearch()
      } else {
        return handleSearch({ searchInput, users, setUsers, allUsers })
      }
    })
  }

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
          list="users"
          type="text"
          name="searchInput"
          autoFocus
          className="bg-slate-200 caret-red-800"
          defaultValue={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          id="searchInput"
        />
        <datalist id="users">
          {dbNames.map((usernames) => (
            <option key={usernames._id}
              value={usernames.fullName.firstName}>
              {usernames.fullName.firstName}{" "}
              {usernames.fullName.middleName}{" "}
              {usernames.fullName.lastName}
            </option>
          ))}
        </datalist>
        <button
          id="searchBtn"
          className="md:px-4 px-2 md:py-3 bg-slate-300 hover:bg-slate-400 border-l-2 border-black"
          onClick={() => handleDynamicSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default UserSearchSortButtons;
