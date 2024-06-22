import { create } from 'zustand';
import { CasesResponse } from '../types/types';

export interface CasesState {
  cases: CasesResponse | null;
  paginationModal: {
    page: number;
    pageSize: number;
  };
  setCases: (cases: CasesResponse | null) => void;
  setPaginationModal: (paginationModal: {
    page: number;
    pageSize: number;
  }) => void;
}

export const useCaseStore = create<CasesState>((set) => ({
  cases: null,
  setCases: (caseRes) => set({ cases: caseRes }),
  paginationModal: {
    page: 0,
    pageSize: 10,
  },
  setPaginationModal: (paginationModal) => set({ paginationModal }),
}));
