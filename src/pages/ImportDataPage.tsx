import React, { useState } from 'react';
import { UploadCloud, FileText, Database, Code, Info, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
export default function ImportDataPage() {
  const [isUploading, setIsUploading] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        toast.success(`${acceptedFiles.length} files successfully staged for analysis!`);
      }, 1500);
    },
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-800 bg-slate-900/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" />
                Upload Dataset
              </CardTitle>
              <CardDescription>
                Upload your keyword reports or traffic logs for AI processing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                {...getRootProps()} 
                className={`
                  border-2 border-dashed rounded-xl p-12 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
                  ${isDragActive ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}
                `}
              >
                <input {...getInputProps()} />
                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 shadow-xl">
                  <UploadCloud className={`h-8 w-8 ${isDragActive ? 'text-primary animate-bounce' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {isDragActive ? 'Drop your files here' : 'Drag & drop reports here'}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs leading-relaxed">
                  Support for CSV, JSON and Excel files up to 50MB.
                </p>
                <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-lg text-md font-semibold shadow-lg shadow-primary/20">
                  Select Files
                </Button>
              </div>
              <div className="mt-8 flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-primary">Pro Tip:</span> Ensure your date format is ISO-8601 (YYYY-MM-DD) for optimal time-series analysis accuracy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-900/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Supported Formats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'CSV Reports (Standard)', ext: '.csv' },
                { label: 'JSON API Dumps', ext: '.json' },
                { label: 'Excel Worksheets', ext: '.xlsx' }
              ].map((format) => (
                <div key={format.ext} className="flex items-center justify-between p-3 rounded-md bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{format.ext}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-slate-400" />
                Expected Columns
              </CardTitle>
              <CardDescription>
                Include these for best results.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Keyword</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Impressions</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Clicks</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Position</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">CTR</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Landing Page</Badge>
              <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">Search Intent</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}