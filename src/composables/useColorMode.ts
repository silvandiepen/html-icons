import { reactive, watch, computed } from "vue";

export enum ColorMode {
  DARK = "dark",
  LIGHT = "light",
}

export const colorState = reactive({
  mode: ColorMode.LIGHT,
});

export const useColorMode = () => {
  const setCurrentMode = (): void => {
    // Set to local storage
    localStorage.setItem("colorMode", colorState.mode);

    // Set body attribute
    document.body.setAttribute("color-mode", colorState.mode);
  };

  const switchColorMode = () => {
    console.log("switching", colorState.mode);
    colorState.mode =
      colorState.mode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK;
  };

  watch(
    () => colorState.mode,
    () => {
      setCurrentMode();
    }
  );

  const initColorMode = () => {
    const isDarkMode = window.matchMedia("prefers-color-scheme: dark").matches;
    const storageMode = localStorage.getItem("colorMode");

    if (storageMode) {
      colorState.mode = storageMode as ColorMode;
    } else {
      colorState.mode = isDarkMode ? ColorMode.DARK : ColorMode.LIGHT;
    }
    setCurrentMode();
  };

  const colorMode = computed(() => {
    return colorState.mode;
  });

  const oppositeMode = computed(() => {
    return colorState.mode == ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK;
  });

  const setDarkmode = () => {
    colorState.mode = ColorMode.DARK;
  };
  const setLightmode = () => {
    colorState.mode = ColorMode.LIGHT;
  };

  return {
    colorMode,
    oppositeMode,
    initColorMode,
    setCurrentMode,
    switchColorMode,
    setDarkmode,
    setLightmode,
  };
};
