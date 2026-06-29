import { Icon } from "@iconify/react";
import { type DocumentDetail } from "../store/DocumentStore"; // adjust path

interface DocumentInfomationProps {
  currentDocument: DocumentDetail;
  type?: string;
}
export default function DocumentInfomation({
  currentDocument,
  type,
}: DocumentInfomationProps) {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const documentFields = [
    {
      label: "File Name",
      icon: "lineicons:file-pencil",
      value: currentDocument.name,
    },
    {
      label: "File Type",
      icon: "lucide:file-type",
      value: currentDocument.type,
    },
    { label: "File Size", icon: "entypo:drive", value: currentDocument.size },
    {
      label: "Owner (Uploader)",
      icon: "material-symbols:person",
      value: currentDocument.owner,
      img: currentDocument.ownerAvatarUrl,
    },
    {
      label: "Date Added",
      icon: "clarity:date-solid",
      value: formatDate(currentDocument.dateAdded),
    },
    {
      label: "Last Editor",
      icon: "gravity-ui:person-pencil",
      value: currentDocument.lastEditor,
      img: currentDocument.lastEditorAvatarUrl,
    },
    {
      label: "Last Edited",
      icon: "mingcute:time-line",
      value: formatDate(currentDocument.lastModified),
    },
    {
      label: "Knowledge Base",
      icon: "mingcute:brain-fill",
      value: currentDocument.knowledgeBaseName,
    },
    {
      label: "Upload Path",
      icon: "mdi:file-location",
      value: currentDocument.uploadPath,
      className: "truncate overflow-ellipsis",
    },
  ];

  const coreInfo = [
    {
      label: "File Name",
      value: currentDocument.name,
    },
    {
      label: "File Type",

      value: currentDocument.type,
    },
    { label: "File Size", icon: "entypo:drive", value: currentDocument.size },

    {
      label: "Knowledge Base",

      value: currentDocument.knowledgeBaseName,
    },
    {
      label: "Upload Path",

      value: currentDocument.uploadPath,
      className: "truncate overflow-ellipsis",
    },
    {
      label: "Document ID",
      value: currentDocument.id,
    },
  ];

  if (type === "coreInfo") {
    return (
      <div className="grid grid-cols-[auto_1fr] gap-x-30 gap-y-4">
        {coreInfo.map((field) => (
          <>
            <div
              key={`label-${field.label}`}
              className="flex items-center gap-2 text-[#454545] font-light"
            >
              <p>{field.label}</p>
            </div>

            <p key={`val-${field.label}`} className={field.className ?? ""}>
              {field.value}
            </p>
          </>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-20 gap-y-3">
      {documentFields.map((field) => (
        <>
          <div
            key={`label-${field.label}`}
            className="flex items-center gap-2 text-[#454545] font-light"
          >
            <Icon className="size-fit" icon={field.icon} />
            <p>{field.label}</p>
          </div>

          {field.label === "Owner (Uploader)" ||
          field.label === "Last Editor" ? (
            <div key={`val-${field.label}`} className="flex items-center gap-2">
              <img
                src={field.img}
                className="rounded-full size-6 object-cover"
              />
              <p className={field.className ?? ""}>{field.value}</p>
            </div>
          ) : (
            <p key={`val-${field.label}`} className={field.className ?? ""}>
              {field.value}
            </p>
          )}
        </>
      ))}
    </div>
  );
}
