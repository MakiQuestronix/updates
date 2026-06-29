import { useState } from "react";

interface Props {
  onClose: () => void;
  onBack: () => void;
  files: File[];
}

function AddMetadata({ onClose, onBack, files }: Props) {
  const [uploading, setIsUploading] = useState(true);
  const [openFile, setOpenFile] = useState<number | null>(0);
  const [metadata, setMetadata] = useState<
    Record<number, { name: string; value: string; type: string }>
  >(() =>
    Object.fromEntries(
      files.map((_, i) => [i, { name: "", value: "", type: "String" }]),
    ),
  );
  const updateMeta = (
    index: number,
    field: "name" | "value" | "type",
    val: string,
  ) => {
    setMetadata((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: val },
    }));
  };
  const handleUpload = async () => {
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("metadata", JSON.stringify(metadata[i]));
        // await fetch("/api/documents/upload", {
        //   method: "POST",
        //   body: formData,
        // });
      }
      setIsUploading(false);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setIsUploading(false);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 py-4 px-4">
        <div className="flex flex-col bg-white rounded-xl shadow-lg px-6 pt-10 w-full h-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-fourth px-4">
              Upload Documents
            </h2>
            <button
              onClick={onClose}
              className="text-black text-sm font-bold -mt-4"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-4 items-center mb-4 px-4">
            <div className="flex gap-2 items-center">
              <div className="flex bg-first rounded-full h-10 w-10 items-center justify-center shadow">
                <p className="text-xl text-fourth">1</p>
              </div>
              <p className="font-semibold">Upload Files</p>
            </div>
            <hr className="border border-third my-2 w-1/5" />
            <div className="flex gap-2 items-center">
              <div className="flex bg-fourth border border-[#E0E0E0]/34 rounded-full h-10 w-10 items-center justify-center shadow">
                <p className="text-xl text-white">2</p>
              </div>
              <p className="font-semibold">Add Metadata</p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 w-full bg-white border border-[#e0e0e0]/34 rounded-md my-2 shadow h-full">
            <div className="flex flex-col gap-2 overflow-y-auto h-100 pr-1 pt-2">
              {files.map((f, i) => (
                <div key={i} className="border border-[#e0e0e0] rounded-md">
                  {/* Accordion Header */}
                  <button
                    onClick={() => setOpenFile(openFile === i ? null : i)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold text-fourth"
                  >
                    <span>File: {f.name}</span>
                    <span className="font-bold">
                      {openFile === i ? "▲" : "▼"}
                    </span>
                  </button>

                  {openFile === i && (
                    <div className="flex flex-col gap-3 px-6 pb-4 pt-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                          Name
                        </label>
                        <input
                          value={metadata[i]?.name ?? ""}
                          onChange={(e) =>
                            updateMeta(i, "name", e.target.value)
                          }
                          className="border border-[#e0e0e0] rounded-md p-2 text-sm outline-none focus:border-fourth"
                          placeholder="e.g. Security"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                          Value
                        </label>
                        <input
                          value={metadata[i]?.value ?? ""}
                          onChange={(e) =>
                            updateMeta(i, "value", e.target.value)
                          }
                          className="border border-[#e0e0e0] rounded-md p-2 text-sm outline-none focus:border-fourth"
                          placeholder="e.g. Confidential"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                          Type
                        </label>
                        <select
                          value={metadata[i]?.type ?? "String"}
                          onChange={(e) =>
                            updateMeta(i, "type", e.target.value)
                          }
                          className="border border-[#e0e0e0] rounded-md p-2 text-sm outline-none focus:border-fourth"
                        >
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center justify-center my-2 w-2/3 mx-auto">
            <button
              onClick={onBack}
              className="flex-1 py-2 border border-[#e0e0e0]/34 rounded-md shadow"
            >
              Back
            </button>
            <button
              onClick={handleUpload}
              className="flex-1 py-2 border border-[#e0e0e0]/34 bg-fourth rounded-md text-white shadow"
            >
              {uploading ? "Upload Documents" : "Upload Documents"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddMetadata;
