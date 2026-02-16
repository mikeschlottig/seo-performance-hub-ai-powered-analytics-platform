import React, { useState } from 'react';
import { UploadCloud, FileText, Database, Info, CheckCircle2, Loader2, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useDataStore } from '@/lib/data-store';
export default function ImportDataPage() {
  const stagedData = useDataStore(s => s.stagedData);
  const files = useDataStore(s => s.files);
  const addFile = useDataStore(s => s.addFile);
  const setStagedData = useDataStore(s => s.setStagedData);
  const updateFileStatus = useDataStore(s => s.updateFileStatus);
  const clearData = useDataStore(s => s.clearData);
  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      addFile({
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'processing'
      });
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        try {
          let parsed: any[] = [];
          if (file.name.endsWith('.json')) {
            parsed = JSON.parse(content);
          } else {
            // Simple CSV Parser
            const lines = content.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            parsed = lines.slice(1).filter(l => l.trim()).map(line => {
              const values = line.split(',');
              return headers.reduce((obj, header, i) => {
                obj[header] = values[i]?.trim();
                return obj;
              }, {} as any);
            });
          }
          setStagedData([...stagedData, ...parsed]);
          updateFileStatus(file.name, 'completed');
          toast.success(`${file.name} processed successfully`);
        } catch (err) {
          updateFileStatus(file.name, 'error');
          toast.error(`Failed to parse ${file.name}`);
        }
      };
      reader.readAsText(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    }
  });
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-800 bg-slate-900/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  Upload Dataset
                </CardTitle>
                <CardDescription>
                  Upload keyword reports or traffic logs for AI processing.
                </CardDescription>
              </div>
              {files.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearData} className="border-slate-700 hover:bg-slate-800">
                  <X className="h-4 w-4 mr-2" /> Clear All
                </Button>
              )}
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
                  Support for CSV and JSON files.
                </p>
                <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-lg text-md font-semibold">
                  Select Files
                </Button>
              </div>
              {files.length > 0 && (
                <div className="mt-8 space-y-3">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Staged Files</h4>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div key={file.name} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                          {file.status === 'processing' && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                          {file.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        </div>
                        <Progress value={file.status === 'completed' ? 100 : 45} className="h-1 bg-slate-800" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-8 flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-primary">Context Aware:</span> Once uploaded, all active SEO Personas will be able to analyze this data.
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
                { label: 'CSV Reports', ext: '.csv' },
                { label: 'JSON API Dumps', ext: '.json' }
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
                Auto-Discovery
              </CardTitle>
              <CardDescription>AI detects these columns automatically.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="secondary">Keyword</Badge>
              <Badge variant="secondary">Clicks</Badge>
              <Badge variant="secondary">Position</Badge>
              <Badge variant="secondary">CTR</Badge>
              <Badge variant="secondary">Volume</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}