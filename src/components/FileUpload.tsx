import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadSimple, CheckCircle, Warning } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileUpload, isProcessing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      processFile(file);
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 2000);
      onFileUpload(content);
    };
    reader.onerror = () => {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <Card
      className={cn(
        'p-8 border-2 border-dashed transition-all duration-200',
        isDragging && 'border-primary bg-primary/5 scale-[1.02]',
        uploadStatus === 'success' && 'border-secondary bg-secondary/5',
        uploadStatus === 'error' && 'border-destructive bg-destructive/5',
        !isDragging && uploadStatus === 'idle' && 'border-border hover:border-primary/50'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {uploadStatus === 'success' ? (
          <CheckCircle className="text-secondary" size={48} weight="duotone" />
        ) : uploadStatus === 'error' ? (
          <Warning className="text-destructive" size={48} weight="duotone" />
        ) : (
          <UploadSimple 
            className={cn(
              'transition-colors',
              isDragging ? 'text-primary' : 'text-muted-foreground'
            )} 
            size={48} 
            weight="duotone" 
          />
        )}

        <div>
          <h3 className="text-lg font-semibold mb-1">
            {uploadStatus === 'success' 
              ? 'File uploaded successfully!' 
              : uploadStatus === 'error'
              ? 'Upload failed - please use a CSV file'
              : 'Upload Financial Data'
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            {uploadStatus === 'idle' && 'Drag and drop your CSV file here, or click to browse'}
          </p>
        </div>

        {uploadStatus === 'idle' && (
          <>
            <input
              type="file"
              id="file-upload"
              accept=".csv"
              className="hidden"
              onChange={handleFileInput}
              disabled={isProcessing}
            />
            <Button asChild disabled={isProcessing}>
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadSimple className="mr-2" weight="bold" />
                Choose File
              </label>
            </Button>

            <div className="text-xs text-muted-foreground mt-2">
              Required columns: timestamp, revenue, expenses, cash_flow, category
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
