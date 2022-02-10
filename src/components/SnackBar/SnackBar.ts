import { defineComponent, PropType } from "vue";
import { Style } from "@sil/tools";
import { SnackBarPosition } from "./SnackBar.model";

export default defineComponent({
  props: {
    position: {
      type: String as PropType<SnackBarPosition>,
      default: SnackBarPosition.BOTTOMCENTER,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const style = new Style("snack-bar");

    return {
      style,
    };
  },
});
