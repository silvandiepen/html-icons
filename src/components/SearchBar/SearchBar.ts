import { defineComponent, ref, watch } from "vue";
import { Style } from "@sil/tools";
import { useUI } from "../../composables/useUI";

export default defineComponent({
  setup() {
    const style = new Style("search-bar");
    const { toggleSearch, getSearchActive, getSearchTerm, setSearchTerm } =
      useUI();

    const setSearch = (e: HTMLInputElement) => {
      setSearchTerm((e as any).target.value);
    };

    const searchInput = ref<HTMLInputElement>();

    watch(
      () => getSearchActive.value,
      () => {
        if (getSearchActive.value) {
          setTimeout(() => {
            if (searchInput.value !== undefined) {
              searchInput.value.focus();
            }
          });
        }
      }
    );

    return {
      isActiveSearch: getSearchActive,
      searchTerm: getSearchTerm,
      setSearch,
      toggleSearch,
      searchInput,
      style,
    };
  },
});
