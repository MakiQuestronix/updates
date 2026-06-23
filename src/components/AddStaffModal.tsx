import { useState, useRef, useEffect, type ChangeEvent } from "react";
import Search from "../assets/magnifyingGlass.svg?react";
import { useWorkspaceStore } from "../store/workspaceStore";

interface SelectedMember {
  id: number;
  name: string;
  role: "Editor" | "Approver";
}

interface Props {
  onClose: () => void;
}

function AddStaffModal({ onClose }: Props) {
  const { allMembers: members, fetchAllMembers } = useWorkspaceStore();

  const [memberSearch, setMemberSearch] = useState("");
  const [memberRole, setMemberRole] = useState<"Editor" | "Approver" | "">("");
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(
    null,
  );
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const memberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (members.length === 0) fetchAllMembers();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (memberRef.current && !memberRef.current.contains(e.target as Node))
        setMemberDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredMembers = members.filter((m) => {
    const q = memberSearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q)
    );
  });

  const handleAddMember = (member: { id: number; name: string }) => {
    if (!memberRole) {
      setRoleError(true);
      return;
    }
    setRoleError(false);
    setSelectedMember({ ...member, role: memberRole });
    setMemberSearch("");
    setMemberDropdownOpen(false);
  };

  const handleRemoveMember = () => {
    setSelectedMember(null);
  };

  const handleSubmit = async () => {
    if (!selectedMember) return;
    console.log("Staff added:", selectedMember);
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      console.log("Staff added:", selectedMember);
      onClose();
    } catch (err) {
      console.error("Failed to add staff:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl py-4 px-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold pt-4">Add Staff Member</h4>
          <button
            onClick={onClose}
            className="text-black text-sm font-bold -mt-4"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-6 items-start">
          {/* Search */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm">Search User</label>
            <div
              className="relative flex gap-2 border border-[#E0E0E0] rounded-md px-2 py-2 text-sm"
              ref={memberRef}
            >
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={memberSearch}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMemberSearch(e.target.value);
                  setMemberDropdownOpen(true);
                }}
                onFocus={() => setMemberDropdownOpen(true)}
                className="w-full outline-none"
                placeholder="Search user"
              />

              {memberDropdownOpen && filteredMembers.length > 0 && (
                <div className="absolute top-full left-0 z-20 w-full bg-white border border-[#E0E0E0] rounded-md mt-1 shadow-md max-h-36 overflow-y-auto">
                  {filteredMembers.map((m) => {
                    const added = selectedMember?.id === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => !added && handleAddMember(m)}
                        title={added ? "Already selected" : undefined}
                        className={`px-3 py-2 text-sm ${
                          added
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-gray-50 cursor-pointer"
                        }`}
                      >
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.email}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedMember && (
              <div className="mt-1">
                <p className="text-sm font-medium mb-1">Selected Member</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  <span className="flex-1">{selectedMember.name}</span>
                  <span className="text-xs text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 shrink-0">
                    {selectedMember.role}
                  </span>
                  <button
                    onClick={handleRemoveMember}
                    aria-label={`Remove ${selectedMember.name}`}
                    className="w-5 h-5 rounded-full border border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center text-sm leading-none transition-colors shrink-0"
                  >
                    −
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1 shrink-0">
            <label className="text-sm">
              Assign Role <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col text-sm gap-0.5">
              {(["Editor", "Approver"] as const).map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="memberRole"
                    value={r}
                    checked={memberRole === r}
                    onChange={() => {
                      setMemberRole(r);
                      setRoleError(false);
                    }}
                  />
                  {r}
                </label>
              ))}
              {roleError && (
                <p className="text-xs text-red-500 mt-1">
                  Select a role first.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={onClose}
            className="py-1 w-42 rounded-md bg-third text-sm text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedMember}
            className="py-1 w-42 rounded-md bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-60"
          >
            {isSubmitting ? "Adding..." : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStaffModal;
