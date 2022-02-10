import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";
import { Icon } from "../../data/icons/icons.model";
import { useIcons } from "../../composables/useIcons";

export default defineComponent({
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

    const toggleFavorite = () => {
      toggleFavoriteIcon(props.icon?.unicode);
    };
    return {
      copyCode,
      toggleFavorite,
      isFavorite,
      details,
      style,
    };
  },
});
