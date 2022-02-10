import { reactive, computed } from "vue";

interface UIState {
  search: {
    active: boolean;
    term: string;
  };
}
const state = reactive<UIState>({
  search: {
    active: false,
    term: "",
  },
});

export const useUI = () => {
  const toggleSearch = () => {
    state.search.active = !state.search.active;
  };

  const setSearchTerm = (term: string) => {
    state.search.term = term;
  };
  const getSearchTerm = computed(() => {
    return state.search.term;
  });
  const getSearchActive = computed(() => {
    return state.search.active;
  });

  return {
    toggleSearch,
    getSearchActive,
    setSearchTerm,
    getSearchTerm,
  };
};
