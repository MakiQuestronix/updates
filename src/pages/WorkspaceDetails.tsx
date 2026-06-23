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
import Icircle from "../assets/icircle.svg?react";

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
    <>
      <div className="flex px-4 py-2 my-4">
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
          <div className="px-4 pt-4 mt-4 border border-second rounded-md text-sm">
            <div className="grid grid-cols-5 bg-fourth text-first py-2 px-4 font-semibold items-center rounded-t-md t">
              <p>Name</p>
              <p>Description</p>
              <p>Workplace Owner</p>
              <p>Status</p>
              <p>Staff Count</p>
            </div>
            <div className="grid grid-cols-5 px-4 py-2 items-center border-b border-second  hover:bg-gray-50">
              <p>{currentWorkspace?.name}</p>
              <p>{currentWorkspace?.description}</p>
              <p>{currentWorkspace?.owner?.name}</p>
              <p>{currentWorkspace?.status}</p>
              <p>{currentWorkspace?.staffCount}</p>
            </div>
            <div className="flex justify-center px-4 my-2">
              <button
                onClick={() => setShowEdit(true)}
                className="flex justify-center gap-4 hover:bg-second rounded-md px-4 py-2 text-sm"
              >
                <Pencil className="size-4 text-fourth" />
                <p className="font-semibold">Edit Workspace</p>
              </button>
            </div>
          </div>
          <div className="px-4 py-2 mt-4 border border-second rounded-md">
            <p className="text-md font-semibold">Staff Members</p>
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center border border-second rounded-md px-2">
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
                className="bg-fourth text-first m-2 font-semibold px-4 py-2 text-sm rounded-md h-fit hover:bg-third hover:cursor-pointer"
              >
                + Add Staff
              </button>
            </div>

            <div className="border border-second rounded-md overflow-hidden">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="border-b border-second">
                    <th className="px-4 py-3 text-left font-bold">Name</th>
                    <th className="px-4 py-3 text-left font-bold">Email</th>
                    <th className="px-4 py-3 text-left font-bold">Role</th>
                    <th className="px-4 py-3 text-left font-bold">Join Date</th>
                    <th className="px-4 py-3 text-centers font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-second last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{member.name}</td>

                      <td className="px-4 py-3 truncate text-[#0A409A] underline">
                        <a href={`mailto:${member.email}`}>
                          {sentenceCase(member.email)}
                        </a>
                      </td>

                      <td className="px-4 py-3">{sentenceCase(member.role)}</td>

                      <td className="px-4 py-3">
                        {formatDate(member.joinedAt)}
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          to={`/Layout/workspace/${currentWorkspace?.id}/staff/${member.id}`}
                          className="flex justify-center gap-2 font-semibold hover:underline"
                        >
                          <Icircle className="size-4" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showEdit && <EditWorkspaceModal onClose={() => setShowEdit(false)} />}
        {showAddStaff && (
          <AddStaffModal onClose={() => setShowAddStaff(false)} />
        )}
      </div>
    </>
  );
}

export default WorkspaceDetails;
