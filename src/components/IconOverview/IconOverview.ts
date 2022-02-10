import { defineComponent, onMounted, computed } from "vue";
import { Style } from "@sil/tools";
import { IconDetailComponent } from "../IconDetail";
import { useIcons } from "../../composables/useIcons";
import { useUI } from "../../composables/useUI";

export default defineComponent({
  components: {
    IconDetail: IconDetailComponent,
  },
  setup() {
    const style = new Style("icon-overview");

    const {
      getIcons,
      initIcons,
      getCategories,
      getCurrentCategory,
      setCurrentCategory,
    } = useIcons();
    const { getSearchTerm } = useUI();

    const icons = computed(() => {
      return getIcons.value;
    });

    const term = computed(() => {
      return getSearchTerm.value;
    });

    const filteredIcons = computed(() => {
      return icons.value.filter((icon) => {
        let returnValue = false;

        // If there is no search Term
        if (term.value == "") return true;

        // If its in the name
        if (icon.name.toLowerCase().indexOf(term.value.toLowerCase()) > -1) {
          returnValue = true;
        }
        // If its in the entity
        if (icon.entity.toLowerCase().indexOf(term.value.toLowerCase()) > -1) {
          returnValue = true;
        }

        // If it exists in any of the tags
        if (icon.tags)
          icon.tags.forEach((tag) => {
            if (tag.toLowerCase().indexOf(term.value) > -1) {
              returnValue = true;
            }
          });
        return returnValue;
      });
    });

    const setCategory = (category: string) => {
      if (category == getCurrentCategory.value) {
        setCurrentCategory("");
      } else {
        setCurrentCategory(category);
      }
    };

    onMounted(() => {
      initIcons();
    });

    return {
      category: getCurrentCategory,
      categories: getCategories,
      setCategory,
      filteredIcons,
      style,
      searchTerm: term,
    };
  },
});
