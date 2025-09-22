import { useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, Check, Copy, Link, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  file: File;
  id: string;
  url: string;
  preview?: string;
}

const UPLOAD_URL = "http://192.168.1.8:3000/upload"; // Termux backend for testing

const FileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFiles = useCallback(async (fileList: FileList) => {
    setIsUploading(true);
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const id = Math.random().toString(36).substring(2, 15);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json(); // Expect { link: "real URL" }
        const url = data.link;

        let preview: string | undefined;
        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }

        newFiles.push({ file, id, url, preview });
      } catch (err) {
        console.error(err);
        toast({ title: "Upload failed", description: file.name });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(false);
    toast({
      title: "Files uploaded successfully!",
      description: `${newFiles.length} file(s) ready to share`,
    });
  }, [toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) handleFiles(droppedFiles);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFiles(selectedFiles);
      }
      e.target.value = "";
    },
    [handleFiles]
  );

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The share link has been copied to your clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-300 ease-bounce",
          "bg-gradient-upload backdrop-blur-sm",
          isDragging
            ? "border-primary bg-primary/10 shadow-glow"
            : "border-muted-foreground/25 hover:border-primary/50",
          isUploading && "animate-pulse-glow"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="p-8 text-center">
          <div className="mb-4">
            <Upload
              className={cn(
                "mx-auto h-12 w-12 transition-colors duration-300",
                isDragging ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isUploading
              ? "Uploading files..."
              : "Drop files here or click to upload"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supports images, videos, documents, audio files and more
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Choose Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />
        </div>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Files</h3>
          {files.map((uploadedFile) => (
            <Card
              key={uploadedFile.id}
              className="p-4 bg-card/50 backdrop-blur-sm border shadow-card animate-slide-up"
            >
              <div className="flex items-start gap-4">
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <File className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium truncate">{uploadedFile.file.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>

                  {/* Share URL */}
                  <div className="mt-2 flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <code className="text-xs bg-secondary px-2 py-1 rounded flex-grow min-w-0 truncate">
                      {uploadedFile.url}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(uploadedFile.url)}
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(uploadedFile.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
