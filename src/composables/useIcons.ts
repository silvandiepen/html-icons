import { computed, reactive } from "vue";
import { Icon, Icons } from "../data/icons/icons.model";

import iconList from "../data/icons";

interface IconState {
  icons: Icon[];
  category: string;
  categories: string[];
  favorites: string[];
  loading: boolean;
}

enum localKeys {
  FAVORITES = "html-icons:favorites",
}

const iconState = reactive<IconState>({
  icons: [],
  category: "",
  favorites: [],
  loading: true,
});

export const useIcons = () => {
  const initIcons = async () => {
    loadFavorites();
    await setIcons();
  };

  const setIcons = async (force = false) => {
    if (force) iconState.icons.length = 0;
    if (iconState.icons.length > 1) return;

    let iconList: Icons = await fetch("icons.json").then((res) => {
      return res.json();
    });

    iconState.categories = Object.keys(iconList);

    Object.keys(iconList).forEach((category) => {
      iconList[category].forEach((icon) => {
        iconState.icons.push({
          ...icon,
          category: category,
          favorite: isFavoriteIcon(icon.unicode),
        });
      });
    });

    if (iconState.icons.length > 0) iconState.loading = false;
  };
  const getCurrentCategory = computed(() => {
    return iconState.category;
  });

  const setCurrentCategory = (category: string) => {
    iconState.category = category;
  };

  const getCategories = computed(() => {
    return iconState.categories;
  });

  const getTags = computed(() => {
    let tags: string[] = [];
    iconState.icons.forEach((icon: Icon) => {
      if (icon.tags)
        icon.tags.forEach((t: string) => {
          if (!tags.includes(t)) tags.push(t);
        });
    });
    return tags;
  });

  const loadFavorites = () => {
    const localFavorites = localStorage.getItem(localKeys.FAVORITES);

    if (localFavorites) {
      iconState.favorites = JSON.parse(localFavorites) as string[];
    }
  };
  const saveFavorites = () => {
    const appFavorites = JSON.stringify(iconState.favorites);
    localStorage.setItem(localKeys.FAVORITES, appFavorites);
  };

  const isFavoriteIcon = (unicode: string) => {
    return iconState.favorites.includes(unicode);
  };
  const setFavoriteIcon = (unicode: string) => {
    if (!iconState.favorites.includes(unicode))
      iconState.favorites.push(unicode);
    saveFavorites();
  };
  const removeFavoriteIcon = (unicode: string) => {
    iconState.favorites = iconState.favorites.filter((fav) => fav !== unicode);
    saveFavorites();
  };
  const toggleFavoriteIcon = (unicode: string) => {
    if (iconState.favorites.includes(unicode)) {
      removeFavoriteIcon(unicode);
    } else {
      setFavoriteIcon(unicode);
    }
  };

  const getIcons = computed(() => {
    if (!iconState.category)
      return iconState.icons.sort((a, b) =>
        a.favorite < b.favorite ? 1 : b.favorite < a.favorite ? -1 : 0
      );
    else {
      return iconState.icons
        .filter((icon) => icon.category == iconState.category)
        .sort((a, b) =>
          a.favorite < b.favorite ? 1 : b.favorite < a.favorite ? -1 : 0
        );
    }
  });

  const isLoading = computed(() => iconState.loading);

  return {
    getIcons,
    getCurrentCategory,
    getCategories,
    getTags,
    isLoading,
    initIcons,
    setCurrentCategory,
    isFavoriteIcon,
    toggleFavoriteIcon,
  };
};
