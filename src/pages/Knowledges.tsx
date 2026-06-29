import { useState, useEffect, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import Search from "../assets/magnifyingGlass.svg?react";
import Dropdown from "../assets/arrowToggle.svg?react";
import RefreshIcon from "../assets/refresh.svg?react";

//util functions
import { formatRelativeDate } from "../utils/utils";

//ui library
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

import { useKnowledgeStore } from "../store/KnowledgeStore";
import AddKnowledgeModal from "../components/AddKnowledgeModal";
import StatCard from "../components/StatCard";

export type SortField = "lastUpdated" | "dateAdded" | "name";

const SORT_MAP: Record<string, SortField> = {
  "Recently Updated": "lastUpdated",
  "Date Added": "dateAdded",
  Alphabetical: "name",
};

function Knowledges() {
  const {
    knowledgeBase,
    fetchKnowledge,
    recentKnowledgeBase,
    fetchRecentKnowledge,
    workspaces,
    stats,
  } = useKnowledgeStore();

  //UI states
  const [selectedWorkspace, setSelectedWorkspace] = useState("All workspaces");
  const [sort, setSort] = useState("Recently Updated");
  const [displayCount, setDisplayCount] = useState(4);
  const [create, showCreate] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    fetchKnowledge({ sort: SORT_MAP[sort], workspace: selectedWorkspace });
    fetchRecentKnowledge();
  }, [sort, selectedWorkspace, fetchKnowledge]);

  return (
    <>
      <div className="flex h-screen px-4 py-2">
        {create && <AddKnowledgeModal onClose={() => showCreate(false)} />}
        <div className="flex-1 px-4 py-2">
          <div className="mb-4">
            <h1 className=" text-2xl font-semibold text-textColor">
              Knowledges
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2 justify-between bg-first rounded-md border border-second/60 p-4">
              <p className="font-semibold text-2xl">Overview</p>
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  name="Workspaces"
                  amount={stats.workspaceCount.toString()}
                  bgColor="bg-third"
                  textColor="text-white"
                  hoverBgColor="hover:bg-second"
                  textHoverColor="hover:text-textColor"
                  textAlign="text-center"
                  amountSize="3xl"
                />

                <StatCard
                  name="Knowledge Bases"
                  amount={stats.knowledgeBaseCount.toString()}
                  bgColor="bg-fourth"
                  textColor="text-white"
                  hoverBgColor="hover:bg-second"
                  textHoverColor="hover:text-textColor"
                  textAlign="text-center"
                  amountSize="3xl"
                />

                <StatCard
                  name="Documents"
                  amount={stats.documentCount.toString()}
                  bgColor="bg-white"
                  textColor="text-fourth"
                  textAlign="text-center"
                  hoverBgColor="hover:bg-second"
                  textHoverColor="hover:text-textColor"
                  amountSize="3xl"
                />
              </div>
            </div>
            <div className="flex-1 bg-fourth text-first rounded-md p-4 text-sm">
              <div className="flex justify-between">
                <p className=" font-semibold">Recent Knowledge Bases</p>
              </div>
              <hr className="border-0.5 border-first mt-2 mb-4" />
              <div className="grid grid-cols-3 gap-2 font-semibold text-sm">
                <p className="text-left">Knowledge Base</p>
                <p className="text-center">Workspace</p>
                <p className="text-right">Updated</p>
              </div>
              <div>
                {recentKnowledgeBase.slice(0, 3).map((kb) => (
                  <div key={kb.id} className="grid grid-cols-3 pt-2 font-light">
                    <div className="text-start">{kb.name}</div>
                    <div className="text-center">{kb.workspace}</div>
                    <div className="text-end text-sm">
                      {formatRelativeDate(kb.lastUpdated)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pb-2">
            <h1 className="text-lg font-semibold pt-4 py-2">Knowledge Bases</h1>
            <div className="flex gap-4">
              <div className="flex flex-1 py-2 items-center border border-borders rounded-md px-4 self-stretch shadow">
                <Search className="size-4" />
                <input
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="px-2 outline-none text-sm"
                  placeholder="Search knowledge base..."
                />
              </div>

              <div className="flex gap-10 items-center border border-borders rounded-md px-4 py-2 self-stretch shadow">
                <div className="flex items-center ">
                  <p className="font-semibold mr-2">Workspaces:</p>
                  <div className="relative">
                    <Listbox
                      value={selectedWorkspace}
                      onChange={setSelectedWorkspace}
                    >
                      <div className="relative w-48">
                        <ListboxButton className="flex items-center gap-2 outline-none w-full justify-between text-sm">
                          {selectedWorkspace}
                          <Dropdown className="size-4" />
                        </ListboxButton>
                        <ListboxOptions className="absolute z-20 mt-1 w-full bg-white border border-second rounded-md shadow-lg outline-none ">
                          {["All Workspaces", ...workspaces].map((ws) => (
                            <ListboxOption
                              key={ws}
                              value={ws}
                              className="px-4 py-2 text-sm cursor-pointer rounded-md data-focus:bg-fourth data-focus:text-first"
                            >
                              {ws}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Sorted by:</p>

                  <div className="relative">
                    <Listbox value={sort} onChange={setSort}>
                      <div className="relative w-48">
                        <ListboxButton className="flex items-center gap-2 outline-none w-full justify-between text-sm">
                          {sort}
                          <Dropdown className="size-4" />
                        </ListboxButton>

                        <ListboxOptions className="absolute z-20 mt-1 w-full bg-white border border-second rounded-md shadow-lg outline-none">
                          {[
                            "Recently Updated",
                            "Date Added",
                            "Alphabetical",
                          ].map((option) => (
                            <ListboxOption
                              key={option}
                              value={option}
                              className="px-4 py-2 text-sm cursor-pointer rounded-md data:bg-fourth data:text-first "
                            >
                              {option}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showCreate(true)}
                className="flex-1 font-semibold text-sm text-first bg-third rounded-md px-4 py-2 shadow-lg"
              >
                + Create Knowledge Base
              </button>
            </div>
            <div className="border border-second rounded-md py-4 my-4 shadow px-4">
              <table className="w-full border-separate border-spacing-0 px-4 py-2 text-sm">
                <thead>
                  <tr className="bg-fourth text-first font-semibold">
                    <th className="p-2 px-4 text-left border-t border-l border-second rounded-tl-md">
                      Knowledge Base
                    </th>
                    <th className="p-2 text-center border-t border-second">
                      Workspace
                    </th>
                    <th className="p-2 text-center border-t border-second">
                      Documents
                    </th>
                    <th className="p-2 text-center border-t border-second">
                      Updated
                    </th>
                    <th className="p-2 text-left border-t border-second">
                      Created by
                    </th>
                    <th className="p-2 px-4 border-t border-r border-second rounded-tr-md" />
                  </tr>
                </thead>
                <tbody>
                  {knowledgeBase.slice(0, displayCount).map((kb, i, arr) => {
                    const isLast = i === arr.length - 1;
                    return (
                      <tr key={kb.id}>
                        <td
                          className={`p-2 px-4 border-l border-t border-second ${isLast ? "border-b rounded-bl-md" : ""}`}
                        >
                          {kb.name}
                        </td>
                        <td
                          className={`p-2 border-t text-center border-second ${isLast ? "border-b" : ""}`}
                        >
                          {kb.workspace}
                        </td>
                        <td
                          className={`p-2 border-t text-center border-second ${isLast ? "border-b" : ""}`}
                        >
                          {kb.documents ?? "—"}
                        </td>
                        <td
                          className={`p-2 border-t text-center text-sm border-second ${isLast ? "border-b" : ""}`}
                        >
                          {formatRelativeDate(kb.lastUpdated) ?? "—"}
                        </td>
                        <td
                          className={`p-2 border-t border-second ${isLast ? "border-b" : ""}`}
                        >
                          {kb.createdBy ?? "—"}
                        </td>
                        <td
                          className={` border-t border-r border-second ${isLast ? "border-b rounded-br-md" : ""}`}
                        >
                          <Link
                            to={`/Layout/knowledges/${kb.id}`}
                            className="px-4 py-1 text-sm rounded-md bg-fourth text-first hover:bg-third"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {displayCount < knowledgeBase.length && (
                <div className="flex justify-center ">
                  <button
                    onClick={() => setDisplayCount(displayCount + 4)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    <RefreshIcon className="size-3 text-fourth" />
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Knowledges;
