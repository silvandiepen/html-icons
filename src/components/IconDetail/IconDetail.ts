import { defineComponent, PropType, computed, ref } from "vue";
import { Style } from "@sil/tools";
import { SnackBarComponent } from "../SnackBar";
import { Icon } from "../../data/icons/icons.model";
import { useIcons } from "../../composables/useIcons";

export default defineComponent({
  components: { SnackBar: SnackBarComponent },
  props: {
    icon: {
      type: Object as PropType<Icon>,
      required: true,
    },
  },
  setup(props) {
    const style = new Style("icon-detail");

    const { toggleFavoriteIcon, isFavoriteIcon } = useIcons();

    const copyCode = (code: string): void => {
      navigator.clipboard.writeText(code).then(
        () => {
          console.log(`copied ${code}`);
          showCopy.value = `Copied ${code}`;
          setTimeout(() => {
            showCopy.value = "";
          }, 1000);
        },
        (err) => {
          console.error(`${code} couldn't be copied, because; ${err}`);
        }
      );
    };

    const isFavorite = computed(() => {
      return isFavoriteIcon(props.icon.unicode);
    });

    const details = computed(() => {
      if (props.icon) {
        return [
          { name: "unicode", code: props.icon.unicode },
          { name: "hex", code: props.icon.hex },
          { name: "html", code: props.icon.entity },
          { name: "css", code: props.icon.css },
        ];
      } else {
        return [];
      }
    });

    const showCopy = ref("");

    const toggleFavorite = () => {
      toggleFavoriteIcon(props.icon?.unicode);
    };
    return {
      copyCode,
      toggleFavorite,
      isFavorite,
      details,
      style,
      showCopy,
    };
  },
});
