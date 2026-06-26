import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, type ChangeEvent } from "react";

import { useKnowledgeStore } from "../store/KnowledgeStore";
import { useDocumentStore, type DocumentDetail } from "../store/DocumentStore";
import { Icon } from "@iconify/react";
import { getFileIconName } from "../utils/utils";

//components
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import ViewImageModal from "../components/ViewImageModal";
import ViewReadmeModal from "../components/ViewReadmeModal";
import DocumentInfomation from "../components/DocumentInformation";
import Pipeline from "../components/Pipeline";
import ApprovalInformation from "../components/ApprovalInformation";
import ProcessingMetadata from "../components/ProcessingMetadata";

interface OverviewTabProps {
  currentDocument: DocumentDetail;
  viewMarkdown: boolean;
  setViewMarkdown: (val: boolean) => void;
  showImageModal: boolean;
  setShowImageModal: (val: boolean) => void;
  imageIndex: number;
  setImageIndex: (index: number) => void;
}

function OverviewTab({
  currentDocument,
  viewMarkdown,
  setViewMarkdown,
  showImageModal,
  setShowImageModal,
  imageIndex,
  setImageIndex,
}: OverviewTabProps) {
  return (
    <div>
      <StatCards currentDocument={currentDocument} />
      <div className="flex gap-4">
        <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
          <p className="font-semibold text-fourth mb-4">Document Information</p>
          <DocumentInfomation currentDocument={currentDocument} />
        </div>
        <Pipeline currentDocument={currentDocument} />
      </div>

      <div className="flex gap-4 my-4">
        <MarkdownView
          showViewMarkdown={viewMarkdown}
          setShowViewMarkdown={setViewMarkdown}
        />
        <OcrImages
          ocrImages={currentDocument.ocrImages}
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      </div>

      <ApprovalInformation
        approval={currentDocument.approval}
        approvalInfo={currentDocument.approvalInfo}
      />
    </div>
  );
}

interface StatCardsProps {
  currentDocument: {
    pagesOCR: number;
    imagesExtracted: number;
    wordsExtracted: number;
    processingTime: string;
  };
}

function StatCards({ currentDocument }: StatCardsProps) {
  return (
    <div className="my-4 flex flex-row items-center justify-center gap-6">
      <StatCard
        name="Pages (OCR)"
        amount={currentDocument?.pagesOCR.toLocaleString()}
        bgColor="bg-first"
        textColor="text-textColor"
        hoverBgColor="hover:bg-second/50"
        textHoverColor="hover:text-textColor"
        amountSize="3xl my-2"
      />
      <StatCard
        name="Images Extracted"
        amount={currentDocument?.imagesExtracted.toLocaleString()}
        bgColor="bg-first"
        textColor="text-textColor"
        hoverBgColor="hover:bg-second/50"
        textHoverColor="hover:text-textColor"
        amountSize="3xl my-2"
      />
      <StatCard
        name="Words Extracted"
        amount={currentDocument.wordsExtracted.toLocaleString()}
        bgColor="bg-first"
        textColor="text-textColor"
        hoverBgColor="hover:bg-second/50"
        textHoverColor="hover:text-textColor"
        amountSize="3xl my-2"
      />
      <StatCard
        name="Pages (OCR)"
        amount={currentDocument?.processingTime}
        bgColor="bg-first"
        textColor="text-textColor"
        hoverBgColor="hover:bg-second/50"
        textHoverColor="hover:text-textColor"
        amountSize="3xl my-2"
      />
    </div>
  );
}

interface MarkdownProps {
  showViewMarkdown: boolean;
  setShowViewMarkdown: (val: boolean) => void;
}
function MarkdownView({
  showViewMarkdown,
  setShowViewMarkdown,
}: MarkdownProps) {
  return (
    <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
      <p className="font-semibold text-lg text-fourth my-2">
        Generated Markdown
      </p>
      <div
        onClick={() => {
          setShowViewMarkdown(true);
        }}
        className="flex p-8 px-20 my-2 border rounded-md border-borders/34 shadow"
      >
        <Icon
          className="size-16 m-auto text-fourth text-center"
          icon="tdesign:file-markdown"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setShowViewMarkdown(true);
          }}
          className="flex items-center gap-2 px-4 py-2 my-2 border border-borders/34 shadow rounded-md text-fourth font-semibold text-sm hover:bg-second/50"
        >
          <Icon icon="mdi:eye" />
          View Markdown
        </button>
        <button className="flex items-center gap-2 px-4 py-2 my-2 border border-borders/34 shadow rounded-md text-fourth font-semibold text-sm hover:bg-second/50">
          <Icon icon="ri:download-line" />
          Download Markdown
        </button>
      </div>
      {showViewMarkdown && (
        <ViewReadmeModal
          filename="Employee_Handbook.md"
          content="Hi"
          onClose={() => setShowViewMarkdown(false)}
        />
      )}
    </div>
  );
}

interface OcrImage {
  id: string;
  thumbnailUrl: string;
  label?: string;
}
interface OcrImagesProps {
  ocrImages: OcrImage[];
  imageIndex: number;
  showImageModal: boolean;
  setImageIndex: (index: number) => void;
  setShowImageModal: (val: boolean) => void;
}

function OcrImages({
  ocrImages,
  imageIndex,
  showImageModal,
  setImageIndex,
  setShowImageModal,
}: OcrImagesProps) {
  return (
    <div className="flex flex-col flex-1 border border-borders/34 shadow p-4 rounded-md text-sm">
      <div className="flex justify-between items-center my-2">
        <p className="font-semibold text-lg text-fourth">
          OCR Extracted Images ({ocrImages.length})
        </p>
        <button
          onClick={() => {
            setImageIndex(1);
            setShowImageModal(true);
          }}
          className="px-4 py-1.5 bg-[#F3CCFF]/80 text-fourth font-semibold rounded-md text-sm hover:bg-second/50 cursor-pointer"
        >
          View All Images
        </button>
      </div>
      <div className="flex-1 items-center grid grid-cols-4 gap-2 p-2 border rounded-md border-[#F8E2FF] shadow bg-[#F8E2FF]/45">
        {ocrImages.slice(0, 4).map((img, i) => {
          const isLast = i === 3;
          const remaining = ocrImages.length - 4;
          return (
            <button
              key={img.id}
              className="relative cursor-pointer"
              onClick={() => {
                setImageIndex(i);
                setShowImageModal(true);
              }}
            >
              <img
                src={img.thumbnailUrl}
                className={`w-full h-36 object-cover rounded-md ${isLast && remaining > 0 ? "brightness-50" : ""}`}
              />
              {isLast && remaining > 0 && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md">
                  <p className="text-white font-bold text-xl">+{remaining}</p>
                </div>
              )}
            </button>
          );
        })}
        {showImageModal && (
          <ViewImageModal
            images={ocrImages}
            initialIndex={imageIndex}
            onClose={() => setShowImageModal(false)}
          />
        )}
      </div>
    </div>
  );
}

function HeaderButtons() {
  return (
    <div className="flex gap-2 text-sm items-center">
      <button className="flex gap-2 items-center py-2 px-4 text-center rounded-md font-semibold border border-borders/34 shadow text-fourth hover:bg-second cursor-pointer">
        <Icon icon="ri:download-line" />
        Download Original File
      </button>
      <button className="py-2 px-4 text-center rounded-md font-semibold border shadow text-status-active border-status-active/34 hover:bg-status-active/10 cursor-pointer">
        Approve
      </button>
      <button className="py-2 px-4 text-center rounded-md font-semibold border border-status-inactive/34 shadow text-status-inactive hover:bg-status-inactive/10 cursor-pointer">
        Decline
      </button>
      <button className="py-2 px-4 text-center rounded-md font-semibold border border-[#D2AFFF]/34 text-third shadow cursor-pointer hover:bg-third/10">
        Archive
      </button>
    </div>
  );
}

function Documents() {
  const { id, docId } = useParams();
  const { currentKnowledge, fetchKnowledgeById } = useKnowledgeStore();
  const { fetchDocumentById, currentDocument } = useDocumentStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "Overview";
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [viewMarkdown, setViewMarkdown] = useState(false);

  const [filter, setFilter] = useState("All Activities");
  const [dateFilter, setDateFilter] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  //functions
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (id && docId) {
      fetchDocumentById(docId);
      fetchKnowledgeById(id);
    }
  }, [id, docId, fetchDocumentById, fetchKnowledgeById]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!currentDocument || !currentKnowledge) {
    return;
  }

  const filteredLogs = currentDocument.activityLog.filter((item) => {
    const matchRole =
      filter === "All Activities" ||
      item.actorRole === filter ||
      item.actorName === filter;
    const matchDate = !dateFilter || item.timestamp.startsWith(dateFilter);
    return matchRole && matchDate;
  });

  return (
    <>
      <div className="m-4 my-4">
        <div className="py-2 px-4 overflow-y-auto">
          <div className="text-sm">
            <Link
              to={`/Layout/knowledges/`}
              className="hover:underline cursor-pointer"
            >
              Knowledge Management
            </Link>
            {" > "}
            <Link
              to={`/Layout/knowledges/${currentKnowledge.id}`}
              className="hover:underline cursor-pointer"
            >
              {currentKnowledge?.name}
            </Link>
            <span className="font-bold">
              {" > "} {currentDocument.name}
            </span>
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="size-12 p-1 flex items-center justify-center rounded-full border border-borders shadow">
                <Icon
                  className="size-full pr-1"
                  icon={getFileIconName(currentDocument.name)}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold text-lg text-fourth">
                    {currentDocument.name}
                  </h1>

                  <StatusBadge
                    type="approval"
                    value={currentDocument.approval}
                    styling="text-xs px-2"
                  />
                </div>
                <div className="flex gap-2 text-sm text-[#454545]/78">
                  <p>ID: {currentDocument.id}</p>
                  <p> • </p>
                  <p>Uploaded: {formatDate(currentDocument.uploadedAt)}</p>
                  <p> • </p>
                  <p>Size {currentDocument.size}</p>
                </div>
              </div>
            </div>

            <HeaderButtons />
          </div>

          <div className="flex gap-4 bg-[#F7F7F7] w-fit p-1 rounded-md mt-6 shadow">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`px-8 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                activeTab === "Overview"
                  ? "bg-first"
                  : "bg-[#F7F7F7] text-fourth"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("Metadata")}
              className={`px-8 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                activeTab === "Metadata"
                  ? "bg-first"
                  : "bg-[#F7F7F7] text-fourth"
              }`}
            >
              Metadata
            </button>
            <button
              onClick={() => setActiveTab("Activity Log")}
              className={`px-8 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                activeTab === "Activity Log"
                  ? "bg-first"
                  : "bg-[#F7F7F7] text-fourth"
              }`}
            >
              Activity Log
            </button>
          </div>

          {activeTab === "Overview" ? (
            <OverviewTab
              currentDocument={currentDocument}
              showImageModal={showImageModal}
              setShowImageModal={setShowImageModal}
              imageIndex={imageIndex}
              setImageIndex={setImageIndex}
              viewMarkdown={viewMarkdown}
              setViewMarkdown={setViewMarkdown}
            />
          ) : activeTab === "Metadata" ? (
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
                <p className="font-semibold text-fourth text-lg mb-4">
                  Core Information
                </p>
                <DocumentInfomation
                  currentDocument={currentDocument}
                  type="coreInfo"
                />
              </div>
              <ProcessingMetadata currentDocument={currentDocument} />
              <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
                <p className="font-semibold text-fourth text-lg mb-4">
                  Ownership
                </p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Created By
                    </p>
                    {currentDocument.owner}
                  </div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Created Date
                    </p>
                    <p>{currentDocument.uploadedAt}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Last Edited By
                    </p>
                    <p>{currentDocument.lastEditor}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Last Edited Date
                    </p>
                    <p>{currentDocument.lastModified}</p>
                  </div>
                </div>
              </div>
              <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
                <p className="font-semibold text-fourth text-lg mb-4">
                  Custom Metadata
                </p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Name
                    </p>
                    {currentDocument.metadata?.customMetadata.name}
                  </div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Value
                    </p>
                    <p>{currentDocument.metadata?.customMetadata.value}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <p className="flex items-center gap-2 text-[#454545] font-light">
                      Type
                    </p>
                    <p>{currentDocument.metadata?.customMetadata.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-8">
              <div className="flex flex-col">
                <div className="flex justify-between gap-2 items-center my-4">
                  <div className="flex flex-row  py-2 items-center w-fit border border-borders rounded-md px-4 shadow">
                    <Icon icon="material-symbols:search" className="size-4" />
                    <input
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="px-2 outline-none text-sm"
                      placeholder="Search activity"
                    />
                  </div>
                  <div className="flex gap-2 items-center relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="border border-borders/34 rounded-md px-4 py-2 text-sm shadow bg-white text-fourth font-semibold cursor-pointer"
                    >
                      <option value="All Activities">All Activities</option>
                      <option value="Owner">Owner</option>
                      <option value="Approver">Approver</option>
                      <option value="Editor">Editor</option>
                      <option value="System">System</option>
                    </select>

                    <div ref={dateRef} className="relative">
                      <button
                        onClick={() => setShowDatePicker((p) => !p)}
                        className="p-2 border border-borders/34 rounded-md shadow bg-white"
                      >
                        <Icon
                          icon="mdi:calendar-month-outline"
                          className="size-5 text-fourth"
                        />
                      </button>
                      {showDatePicker && (
                        <div className="absolute right-0 top-10 z-50 bg-white border border-borders/34 rounded-md shadow p-3">
                          <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border border-borders/34 rounded-md p-2 text-sm outline-none"
                          />
                          {dateFilter && (
                            <button
                              onClick={() => setDateFilter("")}
                              className="mt-2 w-full text-xs text-red-500 hover:underline"
                            >
                              Clear date
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {filteredLogs.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-3 items-center border border-borders/34 shadow p-4 my-2 rounded-md text-sm"
                  >
                    <p className="font-semibold">{item.action}</p>

                    <div className="flex gap-2 items-center">
                      {item.actorAvatarUrl ? (
                        <img
                          src={item.actorAvatarUrl}
                          className="rounded-full size-8 object-cover"
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Icon
                            icon="mdi:robot"
                            className="size-4 text-gray-500"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">{item.actorName}</p>
                        {item.actorRole && (
                          <p className="text-xs text-[#454545]/75">
                            {item.actorRole}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-right text-[#454545]/75">
                      {new Date(item.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Documents;
