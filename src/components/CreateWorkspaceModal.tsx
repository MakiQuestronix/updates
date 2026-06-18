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

const VISIBLE_LIMIT = 2;

function CreateWorkspaceModal({ onClose }: Props) {
  const { allMembers: members, fetchAllMembers } = useWorkspaceStore();

  //UI states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerSearch, setOwnerSearch] = useState("");
  const [ownerDropdownOpen, setOwnerDropdownOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [memberRole, setMemberRole] = useState<"Editor" | "Approver" | "">("");
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    owner?: string;
  }>({});

  const [roleError, setRoleError] = useState(false);

  const ownerRef = useRef<HTMLDivElement>(null);
  const memberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllMembers();
  }, [fetchAllMembers]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ownerRef.current && !ownerRef.current.contains(e.target as Node))
        setOwnerDropdownOpen(false);
      if (memberRef.current && !memberRef.current.contains(e.target as Node))
        setMemberDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOwners = members.filter((m) => {
    const q = ownerSearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q)
    );
  });

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
    if (selectedMembers.some((m) => m.id === member.id)) return;
    setRoleError(false);
    setSelectedMembers((prev) => [...prev, { ...member, role: memberRole }]);
    setMemberRole("");
    setMemberSearch("");
    setMemberDropdownOpen(false);
  };

  const handleRemoveMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
    if (showAll && selectedMembers.length - 1 <= VISIBLE_LIMIT)
      setShowAll(false);
  };

  const visibleMembers = showAll
    ? selectedMembers
    : selectedMembers.slice(0, VISIBLE_LIMIT);
  const extraCount = selectedMembers.length - VISIBLE_LIMIT;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Workspace name is required.";
    if (!ownerSearch.trim()) newErrors.owner = "Owner is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    const payload = {
      name,
      description,
      owner: ownerSearch,
      status: "Active",
      members: selectedMembers,
    };
    try {
      await new Promise((res) => setTimeout(res, 800));
      console.log("Workspace created:", payload);
      onClose();
    } catch (err) {
      console.error("Failed to create workspace:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl py-4 px-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold pt-4">Create Workspace</h4>
          <button
            onClick={onClose}
            className="text-black text-sm font-bold -mt-4"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm">
                Workspace Name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className={`border rounded-md px-3 py-2 text-sm ${
                  errors.name ? "border-red-500" : "border-[#E0E0E0]"
                }`}
              />

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-[#E0E0E0] rounded-md px-3 py-2 text-sm resize-none h-40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm">
                Owner <span className="text-red-500">*</span>
              </label>
              <div
                className="relative flex gap-2 border border-[#E0E0E0] rounded-md px-2 py-2 text-sm "
                ref={ownerRef}
              >
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  value={ownerSearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setOwnerSearch(e.target.value);
                    setOwnerDropdownOpen(true);
                  }}
                  onFocus={() => setOwnerDropdownOpen(true)}
                  className="w-full outline-none "
                  placeholder="Search owner"
                />

                {ownerDropdownOpen && filteredOwners.length > 0 && (
                  <div className="absolute top-full z-20 w-full bg-white border border-[#E0E0E0] rounded-md mt-1 shadow-md max-h-36 overflow-y-auto">
                    {filteredOwners.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setOwnerSearch(m.name);
                          setOwnerDropdownOpen(false);
                          if (errors.owner)
                            setErrors((prev) => ({
                              ...prev,
                              owner: undefined,
                            }));
                        }}
                        className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="font-medium">{m.name}</p>
                        {m.email && (
                          <p className="text-xs text-gray-400">{m.email}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {errors.owner && (
                <p className="text-xs text-red-500">{errors.owner}</p>
              )}
            </div>

            <div ref={memberRef} className="flex gap-4 items-start">
              <div className="flex flex-col gap-2 ">
                <label className="text-sm">Initial Members (Optional)</label>

                <div
                  className="relative flex gap-2 border border-[#E0E0E0] rounded-md px-2 py-2 text-sm "
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
                    className="w-full outline-none "
                    placeholder="Search user"
                  />

                  {memberDropdownOpen && filteredMembers.length > 0 && (
                    <div className="absolute top-full z-20 w-full bg-white border border-[#E0E0E0] rounded-md mt-1 shadow-md max-h-36 overflow-y-auto">
                      {filteredMembers.map((m) => {
                        const added = selectedMembers.some(
                          (s) => s.id === m.id,
                        );
                        return (
                          <div
                            key={m.id}
                            onClick={() => !added && handleAddMember(m)}
                            title={added ? "Already added" : undefined}
                            className={`px-3 py-2 text-sm ${
                              added
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:bg-gray-50 cursor-pointer"
                            }`}
                          >
                            <p className="font-medium">{m.name}</p>
                            {m.email && (
                              <p className="text-xs text-gray-400">{m.email}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {selectedMembers.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Selected Members</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {visibleMembers.map((m) => (
                        <li key={m.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                          <span className="flex-1">{m.name}</span>
                          <span className="text-xs text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 shrink-0">
                            {m.role}
                          </span>
                          <button
                            onClick={() => handleRemoveMember(m.id)}
                            aria-label={`Remove ${m.name}`}
                            className="w-5 h-5 rounded-full border border-red-500font-bold text-red-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-sm leading-none transition-colors shrink-0"
                          >
                            −
                          </button>
                        </li>
                      ))}
                    </ul>
                    {!showAll && extraCount > 0 && (
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-xs text-[#454545] hover:underline mt-1"
                      >
                        +{extraCount} more
                      </button>
                    )}
                    {showAll && selectedMembers.length > VISIBLE_LIMIT && (
                      <button
                        onClick={() => setShowAll(false)}
                        className="text-xs text-[#454545] hover:underline mt-1"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">
                      Role<span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col text-sm">
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
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={onClose}
            className="py-1 w-42 rounded-md bg-[#454545] text-sm text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isSubmitting}
            className="py-1 w-42 rounded-md bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspaceModal;
