export interface SearchState {
  searchQuery: string;
}

const search = {
  state: {
    searchQuery: "",
  },
  getters: {
    getSearchQuery: (state: SearchState): string => state.searchQuery,
  },
  mutations: {
    setSearchQuery: (state: SearchState, data: string): void => {
      state.searchQuery = data;
    },
  },
};

export default search;
