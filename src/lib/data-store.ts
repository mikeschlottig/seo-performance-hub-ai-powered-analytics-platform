import { create } from 'zustand';
export interface StagedFile {
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
export interface KnowledgeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: number;
  contentSnippet: string;
}
interface DataState {
  stagedData: any[];
  files: StagedFile[];
  knowledgeFiles: KnowledgeFile[];
  setStagedData: (data: any[]) => void;
  addFile: (file: StagedFile) => void;
  updateFileStatus: (name: string, status: StagedFile['status']) => void;
  addKnowledgeFile: (file: KnowledgeFile) => void;
  removeKnowledgeFile: (id: string) => void;
  clearData: () => void;
  clearKnowledgeData: () => void;
}
export const useDataStore = create<DataState>((set) => ({
  stagedData: [],
  files: [],
  knowledgeFiles: [],
  setStagedData: (data) => set({ stagedData: data }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  updateFileStatus: (name, status) => set((state) => ({
    files: state.files.map(f => f.name === name ? { ...f, status } : f)
  })),
  addKnowledgeFile: (file) => set((state) => ({ 
    knowledgeFiles: [...state.knowledgeFiles, file] 
  })),
  removeKnowledgeFile: (id) => set((state) => ({
    knowledgeFiles: state.knowledgeFiles.filter(f => f.id !== id)
  })),
  clearData: () => set({ stagedData: [], files: [] }),
  clearKnowledgeData: () => set({ knowledgeFiles: [] }),
}));
export const getAggregatedMetrics = (data: any[]) => {
  if (!data || data.length === 0) return null;
  let clicks = 0;
  let impressions = 0;
  let posSum = 0;
  let count = 0;
  data.forEach(row => {
    const c = Number(row.Clicks || row.clicks || row.total_clicks || 0);
    const i = Number(row.Impressions || row.impressions || row.total_impressions || 0);
    const p = Number(row.Position || row.position || row.avg_pos || 0);
    if (!isNaN(c)) clicks += c;
    if (!isNaN(i)) impressions += i;
    if (!isNaN(p) && p > 0) {
      posSum += p;
      count++;
    }
  });
  return {
    totalClicks: clicks,
    totalImpressions: impressions,
    averagePosition: count > 0 ? posSum / count : 0,
    recordCount: data.length
  };
};