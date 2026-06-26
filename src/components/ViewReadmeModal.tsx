import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface ViewReadmeModalProps {
  filename: string;
  content: string;
  onClose: () => void;
  onDownload?: () => void;
}

function ViewReadmeModal({
  filename,
  content,
  onClose,
  onDownload,
}: ViewReadmeModalProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-4">
      <div
        ref={modalRef}
        className="flex flex-col bg-white rounded-xl shadow-xl w-full max-w-3xl h-[90vh]"
      >
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-200">
          <p className="font-semibold text-[#6B21A8] text-base truncate max-w-[55%]">
            {filename}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoom((z) => Math.max(z - 10, 50))}
              className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
            >
              -
            </button>

            <span className="text-sm w-14 text-center border border-gray-200 rounded h-8 flex items-center justify-center shadow-sm">
              {zoom}%
            </span>

            <button
              onClick={() => setZoom((z) => Math.min(z + 10, 200))}
              className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
            >
              +
            </button>

            <button
              onClick={handleCopy}
              className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
              title={copied ? "Copied!" : "Copy content"}
            >
              <Icon
                icon={copied ? "mdi:check" : "mdi:content-copy"}
                className="size-4 text-gray-600"
              />
            </button>

            <button
              onClick={toggleFullscreen}
              className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
              title="Toggle fullscreen"
            >
              <Icon
                icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}
                className="size-4 text-gray-600"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden border border-borders m-4 rounded-md shadow">
          <div className="shrink-0 flex flex-col items-start px-3 pt-4 gap-1.5">
            <div className="flex items-center rounded gap-2">
              <Icon icon="tabler:code" className="text-gray-500 shrink-0" />
              <span className="text-sm text-gray-600 font-medium">
                Markdown
              </span>
            </div>
          </div>
          <hr className="border-b-0.5 border-borders/50 my-2 mx-2" />

          <div className="flex-1 overflow-auto bg-white px-6 py-5">
            <pre
              className="whitespace-pre-wrap font-mono text-gray-800 leading-relaxed"
              style={{ fontSize: `${(zoom / 100) * 13}px` }}
            >
              {content}
            </pre>
          </div>
        </div>

        <div className="flex justify-center gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-gray-200 rounded-md shadow-sm font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="px-8 py-2 bg-[#6B21A8] text-white rounded-md shadow-sm font-semibold text-sm hover:bg-[#581c87] transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewReadmeModal;
