import { create } from 'zustand';
import { CasesResponse } from '../types/types';
import { initialColumnVisibilityModel } from '../types/constants';

export interface CasesState {
  cases: CasesResponse | null;
  paginationModal: {
    page: number;
    pageSize: number;
  };
  searchTerm: string;
  setCases: (cases: CasesResponse | null) => void;
  setPaginationModal: (paginationModal: {
    page: number;
    pageSize: number;
  }) => void;
  setSearchTerm: (searchTerm: string) => void;
  sortModal: {
    sort: string;
    order: 'asc' | 'desc' | '';
  };
  setSortModal: (sortModal: {
    sort: string;
    order: 'asc' | 'desc' | '';
  }) => void;
  columnVisibilityModal: Record<string, boolean>;
  setcolumnVisibilityModal: (visibilityModal: Record<string, boolean>) => void;
}

const getVisibilityModal = () => {
  const columnVisibility = localStorage.getItem('columnVisibilityModal');
  if (columnVisibility) {
    return JSON.parse(columnVisibility);
  }
  return initialColumnVisibilityModel;
};

export const useCaseStore = create<CasesState>((set) => ({
  cases: null,
  setCases: (caseRes) => set({ cases: caseRes }),
  paginationModal: {
    page: 0,
    pageSize: 10,
  },
  setPaginationModal: (paginationModal) => set({ paginationModal }),
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  sortModal: {
    sort: '',
    order: '',
  },
  setSortModal: (sortModal) => set({ sortModal }),
  columnVisibilityModal: getVisibilityModal(),
  setcolumnVisibilityModal: (columnVisibilityModal) =>
    set({ columnVisibilityModal }),
}));
