import { defineComponent } from "vue";
import { Style } from "@sil/tools";
import { ColorModeComponent } from "../ColorMode";
import { SearchBarComponent } from "../SearchBar";

export default defineComponent({
  components: {
    ColorSwitch: ColorModeComponent,
    SearchBar: SearchBarComponent,
  },
  setup() {
    const style = new Style("header");
    return {
      style,
    };
  },
});
