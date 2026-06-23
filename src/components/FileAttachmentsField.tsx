import { FileText, Paperclip, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ATTACHMENTS_ACCEPT, getAttachmentError } from "@/lib/attachments";

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} КБ`;

  return `${Math.round((size / 1024 / 1024) * 10) / 10} МБ`;
};

type FileAttachmentsFieldProps = {
  id: string;
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

const FileAttachmentsField = ({ id, files, onChange, disabled = false }: FileAttachmentsFieldProps) => {
  const [selectionError, setSelectionError] = useState("");
  const error = selectionError || getAttachmentError(files);

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextFiles = [...files, ...selectedFiles];

    const nextError = getAttachmentError(nextFiles);
    if (nextError) {
      setSelectionError(nextError);
    } else {
      setSelectionError("");
      onChange(nextFiles);
    }

    event.target.value = "";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2">
        <Paperclip className="h-4 w-4 text-accent" aria-hidden="true" />
        Прикрепить документы
        <span className="font-normal text-muted-foreground">(необязательно)</span>
      </Label>
      <Input
        id={id}
        type="file"
        accept={ATTACHMENTS_ACCEPT}
        multiple
        onChange={handleFilesChange}
        disabled={disabled}
        className="cursor-pointer file:mr-3 file:text-small"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        PDF, Word, Excel или изображения: до 3 файлов, не более 5 МБ каждый.
      </p>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      {files.length > 0 ? (
        <ul className="space-y-2" aria-label="Прикреплённые документы">
          {files.map((file) => (
            <li key={`${file.name}-${file.lastModified}`} className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <FileText className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-small text-foreground">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectionError("");
                  onChange(files.filter((selectedFile) => selectedFile !== file));
                }}
                disabled={disabled}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-destructive disabled:pointer-events-none"
                aria-label={`Удалить файл ${file.name}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default FileAttachmentsField;
