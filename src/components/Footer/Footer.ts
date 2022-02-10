import { defineComponent } from "vue";
import { Style } from "@sil/tools";
import { useIcons } from "../../composables/useIcons";

export default defineComponent({
  setup() {
    const style = new Style("footer");

    const { getTags } = useIcons();

    return { tags: getTags, style };
  },
});
