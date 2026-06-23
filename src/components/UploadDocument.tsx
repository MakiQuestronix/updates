import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type DragEvent,
} from "react";

import Cloud from "../assets/Cloud.svg?react";
import { FileIcon, defaultStyles } from "react-file-icon";
import AddMetadata from "./AddMetadata";

interface Props {
  onClose: () => void;
}

function UploadDocument({ onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [step, setStep] = useState<"upload" | "metadata">("upload");

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const valid = validateFiles(dropped);
    setFiles((prev) => [...prev, ...valid]);
  };

  const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const valid = validateFiles(selected);
    setFiles((prev) => [...prev, ...valid]);
  };
  const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "text/plain",
  ];
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

  const [errors, setErrors] = useState<string[]>([]);

  const getFileExt = (filename: string) =>
    filename.split(".").pop()?.toLowerCase() ?? "";

  const validateFiles = (incoming: File[]) => {
    const valid: File[] = [];
    const errs: string[] = [];

    incoming.forEach((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        errs.push(`"${f.name}" is not a supported format.`);
      } else if (f.size > MAX_SIZE) {
        errs.push(`"${f.name}" exceeds the 10 MB limit.`);
      } else {
        valid.push(f);
      }
    });

    setErrors(errs);
    return valid;
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (step === "metadata") {
    return (
      <AddMetadata
        onClose={onClose}
        onBack={() => setStep("upload")}
        files={files}
      />
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-4">
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
              <div className="flex bg-fourth rounded-full h-10 w-10 items-center justify-center shadow">
                <p className="text-xl text-white">1</p>
              </div>
              <p className="font-semibold">Upload Files</p>
            </div>
            <hr className="border border-third my-2 w-1/5" />
            <div className="flex gap-2 items-center">
              <div className="flex bg-white border border-[#E0E0E0]/34 rounded-full h-10 w-10 items-center justify-center shadow">
                <p className="text-xl text-fourth">2</p>
              </div>
              <p className="font-semibold">Add Metadata</p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 w-full bg-white border border-[#e0e0e0]/34 rounded-md my-2 shadow h-full">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center px-4 py-4 w-full bg-[#FEF9FF] rounded-md my-2 flex-1 shadow gap-2 transition-colors ${
                dragging
                  ? "[background-image:repeating-linear-gradient(90deg,#60a5fa_0,#60a5fa_6px,transparent_6px,transparent_10px),repeating-linear-gradient(180deg,#60a5fa_0,#60a5fa_6px,transparent_6px,transparent_10px),repeating-linear-gradient(90deg,#60a5fa_0,#60a5fa_6px,transparent_6px,transparent_10px),repeating-linear-gradient(180deg,#60a5fa_0,#60a5fa_6px,transparent_6px,transparent_10px)] [background-size:10px_1px,1px_10px,10px_1px,1px_10px] [background-position:0_0,0_0,0_100%,100%_0] [background-repeat:repeat-x,repeat-y,repeat-x,repeat-y] bg-blue-50"
                  : "[background-image:repeating-linear-gradient(90deg,#c084fc_0,#c084fc_6px,transparent_6px,transparent_10px),repeating-linear-gradient(180deg,#c084fc_0,#c084fc_6px,transparent_6px,transparent_10px),repeating-linear-gradient(90deg,#c084fc_0,#c084fc_6px,transparent_6px,transparent_10px),repeating-linear-gradient(180deg,#c084fc_0,#c084fc_6px,transparent_6px,transparent_10px)] [background-size:10px_1px,1px_10px,10px_1px,1px_10px] [background-position:0_0,0_0,0_100%,100%_0] [background-repeat:repeat-x,repeat-y,repeat-x,repeat-y]"
              }`}
            >
              <Cloud className="size-20 pt-4" />
              <p className="text-fourth">Drag and drop files here</p>
              <p className="text-sm text-fourth">or</p>

              <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.md,.pptx,.xlsx,.csv"
                className="hidden"
                onChange={handleBrowse}
              />
              <button
                onClick={() => inputRef.current?.click()}
                className="bg-white text-fourth py-2 px-4 rounded-md font-semibold border border-[#e0e0e0] shadow-xs text-sm"
              >
                Browse Files
              </button>

              <p className="pb-4 pt-2 text-xs">
                Supported formats: PDF, DOCX, TXT, MD, PPTX, XLSX, CSV (Max: 10
                MB each)
              </p>
            </div>
            <div className="flex flex-col h-1/2 gap-4">
              <div className="">
                <h2 className="text-xl text-fourth font-semibold">
                  Uploaded Files ({files.length})
                </h2>
              </div>
              <div className="overflow-y-auto max-h-20">
                {files.length > 0 && (
                  <ul className="pb-2 w-full">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between my-2 pl-4 pr-4 gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="size-4 shrink-0">
                            <FileIcon
                              extension={getFileExt(f.name)}
                              {...defaultStyles[getFileExt(f.name)]}
                            />
                          </div>
                          <p className="text-sm font-semibold truncate">
                            {f.name}
                          </p>
                        </div>

                        <p className="text-sm text-gray-500 w-16 mx-4 text-right shrink-0">
                          {(f.size / 1048576).toFixed(2)} MB
                        </p>
                        <button
                          onClick={() => removeFile(i)}
                          className="border border-[#e0e0e0]/20 hover:bg-status-inactive/30 rounded-full size-5 flex items-center justify-center shrink-0"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {errors.length > 0 && (
            <ul className="py-2">
              {errors.map((err, i) => (
                <li key={i} className="text-red-500 text-sm">
                  ⚠ {err}
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-8 items-center justify-center py-4 w-full sm:w-1/2 mx-auto">
            <button
              onClick={() => onClose()}
              className="flex-1 py-2 border border-[#e0e0e0]/34 rounded-md shadow"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (files.length === 0) {
                  const errs: string[] = [];
                  errs.push(`Please upload a file first`);
                  setErrors(errs);
                } else {
                  setStep("metadata");
                }
              }}
              className="flex-1 py-2 border border-[#e0e0e0]/34 bg-fourth rounded-md text-white shadow"
            >
              Add Metadata
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UploadDocument;
