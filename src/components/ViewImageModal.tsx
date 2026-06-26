import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface OcrImage {
  id: string;
  thumbnailUrl: string;
  label?: string;
}

interface ViewImageModalProps {
  images: OcrImage[];
  initialIndex?: number;
  onClose: () => void;
}

function ViewImageModal({
  images,
  initialIndex = 0,
  onClose,
}: ViewImageModalProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(100);

  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setCurrent((p) => Math.min(p + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrent((p) => Math.max(p - 1, 0));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

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
        className="flex flex-col bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh]"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-borders/34">
          <p className="font-semibold text-fourth text-lg">
            Image {current + 1} of {images.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(z - 10, 10))}
              className="px-2 py-1 border border-borders/34 rounded text-sm shadow"
            >
              -
            </button>
            <span className="text-sm w-16 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 10, 200))}
              className="px-2 py-1 border border-borders/34 rounded text-sm shadow"
            >
              +
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-1 border border-borders/34 rounded shadow"
              title="Reset zoom"
            >
              <Icon icon="tdesign:fullscreen" className="size-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1 border border-borders/34 rounded shadow"
              title="Toggle fullscreen"
            >
              <Icon
                icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}
                className="size-5"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#F8F8F8] px-6 py-4">
          <div className="min-w-full min-h-full flex items-center justify-center">
            <img
              src={images[current].thumbnailUrl}
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
              }}
              className="object-contain rounded-md shadow max-h-fit transition-all"
            />
          </div>
        </div>
        {/* Thumbnails */}
        <div className="relative flex items-center px-4 py-3 border-t border-borders/34 gap-2">
          <button
            onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
            disabled={current === 0}
            className="shrink-0 p-1 border border-borders/34 rounded shadow disabled:opacity-30"
          >
            <Icon icon="mdi:chevron-left" className="size-5" />
          </button>

          <div className="flex gap-2 overflow-x-auto flex-1 py-1 px-1">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setCurrent(i)}
                className={`shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                  i === current ? "border-fourth" : "border-transparent"
                }`}
              >
                <img
                  src={img.thumbnailUrl}
                  className="h-16 w-20 object-cover"
                />
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrent((p) => Math.min(p + 1, images.length - 1))
            }
            disabled={current === images.length - 1}
            className="shrink-0 p-1 border border-borders/34 rounded shadow disabled:opacity-30"
          >
            <Icon icon="mdi:chevron-right" className="size-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 px-6 py-4 border-t border-borders/34">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-borders/34 rounded-md shadow font-semibold text-sm"
          >
            Close
          </button>
          <button className="px-8 py-2 bg-fourth text-white rounded-md shadow font-semibold text-sm">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewImageModal;
