import { create } from "zustand";

import apiCall from "../../api";

type Actions = {
    onSearchResults: (searchText: string) => Promise<void>;
};

type State = {
    searchResults: any[];
    isLoading: boolean;
    error: undefined | object | Error;
};

const initialState: State = {
    searchResults: [],
    isLoading: false,
    error: undefined
};

const useResultsStore = create<State & Actions>((set, get) => ({
    ...initialState,
    onSearchResults: async (searchText: string) => {
        try {
            set({ isLoading: true, error: undefined });
            const response = await apiCall(`/search.php?s=${searchText}`);
            set({ searchResults: response?.meals });
        } catch (error) {
            set({ error: error as Error });
        } finally {
            set({ isLoading: false });
        }
    },
}));

// Ejemplo
// set((state) => ({ bears: state.bears + 1 }))
/* 
    set((state) => ({
        ...state.object, 
        object: { 
            ...state.object.object,
            object: { 
                ...state.object.object.object,
                object: {} 
            } 
    }))
*/
export default useResultsStore;