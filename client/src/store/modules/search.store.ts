interface State {
  searchQuery: string;
}

const search = {
  state: {
    searchQuery: "",
  },
  getters: {
    getSearchQuery: (state: State): string => state.searchQuery,
  },
  mutations: {
    setSearchQuery: (state: State, data: string): void => {
      state.searchQuery = data;
    },
  },
};

export default search;
