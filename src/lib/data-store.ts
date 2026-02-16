import { create } from 'zustand';
export interface StagedFile {
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
interface DataState {
  stagedData: any[];
  files: StagedFile[];
  setStagedData: (data: any[]) => void;
  addFile: (file: StagedFile) => void;
  updateFileStatus: (name: string, status: StagedFile['status']) => void;
  clearData: () => void;
}
export const useDataStore = create<DataState>((set) => ({
  stagedData: [],
  files: [],
  setStagedData: (data) => set({ stagedData: data }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  updateFileStatus: (name, status) => set((state) => ({
    files: state.files.map(f => f.name === name ? { ...f, status } : f)
  })),
  clearData: () => set({ stagedData: [], files: [] }),
}));