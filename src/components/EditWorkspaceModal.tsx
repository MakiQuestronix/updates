import { useState, useRef, useEffect, type ChangeEvent } from "react";
import Search from "../assets/magnifyingGlass.svg?react";
import { useWorkspaceStore } from "../store/workspaceStore";

interface Props {
  onClose: () => void;
}

function EditWorkspaceModal({ onClose }: Props) {
  const {
    allMembers: members,
    fetchAllMembers,
    currentWorkspace,
  } = useWorkspaceStore();

  const [name, setName] = useState(currentWorkspace?.name ?? "");
  const [description, setDescription] = useState(
    currentWorkspace?.description ?? "",
  );
  const [ownerSearch, setOwnerSearch] = useState(
    currentWorkspace?.owner.name ?? "",
  );
  const [ownerDropdownOpen, setOwnerDropdownOpen] = useState(false);
  const [status, setStatus] = useState("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; owner?: string }>({});

  const ownerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllMembers();
  }, [fetchAllMembers]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ownerRef.current && !ownerRef.current.contains(e.target as Node))
        setOwnerDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOwners = members.filter((m) =>
    m.name.toLowerCase().includes(ownerSearch.toLowerCase()),
  );

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Workspace name is required.";
    if (!ownerSearch.trim()) newErrors.owner = "Owner is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    const payload = {
      id: currentWorkspace?.id,
      name,
      description,
      owner: ownerSearch,
      status,
    };
    try {
      await new Promise((res) => setTimeout(res, 800));
      console.log("Workspace updated:", payload);
      onClose();
    } catch (err) {
      console.error("Failed to update workspace:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl py-4 px-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold pt-4">Edit Workspace</h4>
          <button onClick={onClose} className=" -mt-4 text-black font-bold">
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
                className="relative flex gap-2 border border-[#E0E0E0] rounded-md px-2 py-2 text-sm"
                ref={ownerRef}
              >
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  value={ownerSearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setOwnerSearch(e.target.value);
                    setOwnerDropdownOpen(true);
                    if (errors.owner)
                      setErrors((prev) => ({ ...prev, owner: undefined }));
                  }}
                  onFocus={() => {
                    setOwnerSearch("");
                    setOwnerDropdownOpen(true);
                  }}
                  className="w-full outline-none"
                  placeholder="Search user"
                />
                {ownerDropdownOpen && filteredOwners.length > 0 && (
                  <div className="absolute top-full left-0 z-20 w-full bg-white border border-[#E0E0E0] rounded-md mt-1 shadow-md max-h-36 overflow-y-auto">
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
                        {m.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.owner && (
                <p className="text-xs text-red-500">{errors.owner}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col text-sm gap-0.5">
                {(["ACTIVE", "INACTIVE"] as const).map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={() => setStatus(s)}
                    />
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-auto">
              <p className="text-sm font-semibold">Workspace Statistics</p>
              <div className="text-sm text-gray-700 space-y-0.5">
                <p>Staff Members : {currentWorkspace?.staffCount ?? "—"}</p>
                <p>
                  Knowledge Bases : {currentWorkspace?.knowledgeCount ?? "—"}
                </p>
                <p>Documents : {currentWorkspace?.documentCount ?? "—"}</p>
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
            onClick={handleSave}
            disabled={isSubmitting}
            className="py-1 w-42 rounded-md bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWorkspaceModal;
