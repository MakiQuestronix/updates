import { type DocumentDetail } from "../store/DocumentStore";

interface ProcessingMetadataProps {
  currentDocument: DocumentDetail;
}
export default function ProcessingMetadata({
  currentDocument,
}: ProcessingMetadataProps) {
  return (
    <div className="border border-borders/34 shadow p-4 rounded-md text-sm">
      <p className="font-semibold text-fourth text-lg mb-4">
        Processing Metadata
      </p>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-20">
          <p className="flex items-center gap-2 text-[#454545] font-light">
            OCR Engine
          </p>
          {currentDocument.metadata?.processingMetadata.ocrEngine}
        </div>
        <div className="grid grid-cols-2 gap-x-20">
          <p className="flex items-center gap-2 text-[#454545] font-light">
            OCR Language
          </p>
          <p>{currentDocument.metadata?.processingMetadata.ocrLanguage}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-20">
          <p className="flex items-center gap-2 text-[#454545] font-light">
            OCR Confidence
          </p>
          <p>{currentDocument.metadata?.processingMetadata.ocrConfidence}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-20">
          <p className="flex items-center gap-2 text-[#454545] font-light">
            Markdown Version
          </p>
          <p>{currentDocument.metadata?.processingMetadata.markdownVersion}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-20">
          <p className="flex items-center gap-2 text-[#454545] font-light">
            Validation Score
          </p>
          <p>{currentDocument.metadata?.processingMetadata.validationScore}</p>
        </div>
      </div>
    </div>
  );
}
