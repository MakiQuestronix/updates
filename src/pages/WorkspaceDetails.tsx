import { useWorkspaceStore } from "../store/workspaceStore";
import { useParams, Link } from "react-router";
import { useState, useEffect, type ChangeEvent } from "react";

//components
import Header from "../components/Header";
import EditWorkspaceModal from "../components/EditWorkspaceModal";
import AddStaffModal from "../components/AddStaffModal";

//Icons
import Pencil from "../assets/pencil.svg?react";
import Search from "../assets/magnifyingGlass.svg?react";

function WorkspaceDetails() {
  const { id } = useParams();
  const { currentWorkspace, members, fetchWorkspaceById, fetchMembers } =
    useWorkspaceStore();

  const [searchValue, setSearchValue] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sentenceCase = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!id) return;
    const numericId = Number(id);
    fetchWorkspaceById(numericId);
    fetchMembers(numericId);
  }, [id]);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <div className="py-2 px-4 overflow-y-auto">
        <div className="text-md">
          <Link
            to={`/Layout/workspace/`}
            className="hover:underline cursor-pointer"
          >
            Workspaces{" "}
          </Link>
          <span className="font-medium">
            {">"} {currentWorkspace?.name}
          </span>
        </div>
        <div className="px-4 pt-4 mt-4 border border-[#E0E0E0] rounded-md">
          <div className="grid grid-cols-5 bg-black text-white py-2 px-4 font-semibold items-center rounded-t-md t">
            <p className="justify-self-center">Name</p>
            <p className="justify-self-center">Description</p>
            <p className="justify-self-center">Workplace Owner</p>
            <p className="justify-self-center">Status</p>
            <p className="justify-self-center">Staff Count</p>
          </div>
          <div className="grid grid-cols-5 px-4 py-2 items-center border-b border-[#E0E0E0]  hover:bg-gray-50">
            <p className="justify-self-center">{currentWorkspace?.name}</p>
            <p className="justify-self-center">
              {currentWorkspace?.description}
            </p>
            <p className="justify-self-center">
              {currentWorkspace?.leadCurator?.name}
            </p>
            <p className="justify-self-center">{currentWorkspace?.status}</p>
            <p className="justify-self-center">
              {currentWorkspace?.staffCount}
            </p>
          </div>
          <div className="flex justify-center px-4 my-2">
            <button
              onClick={() => setShowEdit(true)}
              className="flex justify-center gap-4 hover:bg-[#e0e0e0] rounded-md px-4 py-2"
            >
              <Pencil className="w-5 h-5 text-black" />
              <p className="font-semibold">Edit Workspace</p>
            </button>
          </div>
        </div>
        <div className="px-4 py-2 mt-4 border border-[#E0E0E0] rounded-md">
          <p className="text-md font-semibold">Staff Members</p>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center border border-[#e0e0e0] rounded-md px-2">
              <Search className="size-4" />
              <input
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full px-2 py-1 outline-none "
                placeholder="Search staff..."
              />
            </div>

            <button
              onClick={() => setShowAddStaff(true)}
              className="bg-black text-white  font-semibold px-8 py-1 rounded-md h-fit hover:bg-[#454545] hover:cursor-pointer"
            >
              + Add Staff
            </button>
          </div>

          <div className="border border-[#E0E0E0] rounded-md px-4 py-2">
            <div className="grid grid-cols-4 px-4 py-2 items-center border-b border-[#E0E0E0] hover:bg-gray-50">
              <p className="justify-self-center font-bold">Name</p>
              <p className="justify-self-center font-bold">Role</p>
              <p className="justify-self-center font-bold">Join Date</p>
              <p className="justify-self-center font-bold">Actions</p>
            </div>
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-4 px-4 py-2 items-center border-b border-[#E0E0E0] hover:bg-gray-50"
              >
                <p className="justify-self-center">{member.name}</p>
                <p className="justify-self-center">
                  {sentenceCase(member.role)}
                </p>
                <p className="justify-self-center">
                  {formatDate(member.joinedAt)}
                </p>

                <div className="justify-self-center">
                  <Link
                    to={`/Layout/workspace/${currentWorkspace?.id}/staff/${member.id}`}
                    className="font-semibold hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showEdit && <EditWorkspaceModal onClose={() => setShowEdit(false)} />}
      {showAddStaff && <AddStaffModal onClose={() => setShowAddStaff(false)} />}
    </div>
  );
}

export default WorkspaceDetails;
