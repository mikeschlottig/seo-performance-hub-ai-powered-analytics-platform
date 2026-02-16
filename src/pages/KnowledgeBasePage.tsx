import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FileText,
  UploadCloud,
  Trash2,
  Eye,
  BookOpen,
  Info,
  FileJson,
  Search,
  FileDown
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDataStore } from '@/lib/data-store';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
export default function KnowledgeBasePage() {
  const knowledgeFiles = useDataStore(s => s.knowledgeFiles);
  const addKnowledgeFile = useDataStore(s => s.addKnowledgeFile);
  const removeKnowledgeFile = useDataStore(s => s.removeKnowledgeFile);
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const isText = file.name.match(/\.(txt|md|json|csv)$/i);
      if (!isText) {
        // Safe metadata-only entry for binary/unsupported files (e.g. PDF in browser without heavy library)
        addKnowledgeFile({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: Date.now(),
          contentSnippet: `Binary File / PDF: Context extracted from filename and metadata only. AI will use the name "${file.name}" for reference.`
        });
        toast.info(`Binary metadata added: ${file.name}`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        addKnowledgeFile({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: Date.now(),
          contentSnippet: text.slice(0, 1500)
        });
        toast.success(`Strategy context added: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'text/markdown': ['.md'],
      'application/json': ['.json'],
      'text/csv': ['.csv']
    }
  });
  const filteredDocs = knowledgeFiles.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Knowledge Base</h2>
          <p className="text-muted-foreground mt-1">
            Provide context for AI Personas with strategy docs and SEO audits.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10 bg-slate-900/50 border-slate-800 text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-slate-800 bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/30'}
        `}
      >
        <input {...getInputProps()} />
        <div className="mx-auto h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-xl">
          <UploadCloud className={`h-8 w-8 ${isDragActive ? 'text-primary animate-bounce' : 'text-slate-400'}`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Add Context Documents</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
          Drag & drop .txt, .md, .json or .pdf files to train your AI SEO experts.
        </p>
      </div>
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="border-slate-800 bg-slate-900/30 group hover:border-slate-700 transition-all hover:translate-y-[-2px]">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="p-2 rounded-lg bg-slate-800 text-primary">
                  {doc.type.includes('json') ? <FileJson className="h-5 w-5" /> : doc.type.includes('pdf') ? <FileDown className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-slate-800">
                  {(doc.size / 1024).toFixed(1)} KB
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-md font-bold text-slate-200 line-clamp-1">{doc.name}</CardTitle>
                <CardDescription className="text-xs mt-1">
                  Added on {new Date(doc.uploadedAt).toLocaleDateString()}
                </CardDescription>
                <div className="mt-4 p-3 bg-slate-950/50 rounded-md border border-slate-800">
                  <p className="text-[11px] text-muted-foreground line-clamp-3 italic leading-relaxed">
                    "{doc.contentSnippet.slice(0, 150)}..."
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => setSelectedSnippet(doc.contentSnippet)}
                >
                  <Eye className="h-4 w-4 mr-2" /> View Snippet
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
                  onClick={() => removeKnowledgeFile(doc.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
          <BookOpen className="h-12 w-12 text-slate-700 mb-4" />
          <h3 className="text-lg font-medium text-slate-400">Knowledge Base Empty</h3>
          <p className="text-sm text-slate-500 mt-1">Uploaded documents provide instant context to all AI Personas.</p>
        </div>
      )}
      <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <Info className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm text-slate-300">
          <span className="font-bold text-primary">Intelligence Hub:</span> AI Personas scan these documents to ensure advice aligns with your internal strategy and brand guidelines.
        </p>
      </div>
      <Dialog open={!!selectedSnippet} onOpenChange={() => setSelectedSnippet(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl text-foreground">
          <DialogHeader>
            <DialogTitle>Strategy Insight Preview</DialogTitle>
            <DialogDescription>
              Raw context delivered to SEO Personas for analysis.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 bg-slate-950 rounded-lg border border-slate-800 max-h-[400px] overflow-y-auto">
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
              {selectedSnippet}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}