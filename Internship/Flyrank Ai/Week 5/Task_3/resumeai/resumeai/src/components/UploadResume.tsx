import { useCallback, useRef, useState } from "react";

interface UploadResumeProps {
  onFileSelected: (file: File) => void;
  loadingMessage: string | null;
}

export default function UploadResume({ onFileSelected, loadingMessage }: UploadResumeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/10" : "border-white/20 hover:border-primary/60"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {loadingMessage ? (
        <p className="text-primary animate-pulse">{loadingMessage}</p>
      ) : (
        <>
          <p className="text-lg font-medium">Drag & drop your resume PDF here</p>
          <p className="text-white/50 text-sm mt-2">or click to browse files</p>
        </>
      )}
    </div>
  );
}
