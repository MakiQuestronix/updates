import { useState, useEffect, type ChangeEvent } from "react";

import { useKnowledgeStore } from "../store/KnowledgeStore";
import KnowledgeConfirmation from "./KnowledgeConfirmation";

interface Props {
  onClose: () => void;
}

export type SortField = "lastUpdated" | "dateAdded" | "name";

function AddKnowledgeModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const { workspaces } = useKnowledgeStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      setIsError(false);
      setError("");

      if (!selectedWorkspace || !name?.trim()) {
        setError("Please fill in all fields");
        setIsError(true);
        return;
      }

      //backend API here

      //only run this if backend runs ok
      setIsConfirming(true);
    } catch (err) {
      console.error("Failed to add staff:", err);
      setError("Failed to create knowledge base");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isConfirming) {
    return (
      <KnowledgeConfirmation
        knowledge={{ name, workspace: selectedWorkspace }}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold">Create Knowledge Base</h4>
          <button
            onClick={onClose}
            className="text-black text-sm font-bold -mt-4"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <p className="font-semibold">
            Name<span className="text-red-500">*</span>
          </p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border border-second text-sm rounded-md w-full outline-none p-2"
          />
        </div>
        <div>
          <p className="font-semibold">
            Workspace<span className="text-red-500">*</span>
          </p>
          <select
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            className="p-2 text-sm cursor-pointer rounded-md border border-second w-full outline-none"
          >
            <option value="">Select Workspace...</option>
            {[...workspaces].map((ws) => (
              <option key={ws} value={ws}>
                {ws}
              </option>
            ))}
          </select>
        </div>
        {isError && <p className="text-red-500 my-2 text-sm">{error}</p>}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={onClose}
            className="py-1 w-42 rounded-md bg-third text-sm text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-1 w-42 rounded-md bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddKnowledgeModal;
