import { computed, reactive } from "vue";
import { Icon } from "../data/icons/icons.model";

import iconList from "../data/icons";

interface IconState {
  icons: Icon[];
  category: string;
  favorites: string[];
}

enum localKeys {
  FAVORITES = "html-icons:favorites",
}

const iconState = reactive<IconState>({
  icons: [],
  category: "",
  favorites: [],
});

export const useIcons = () => {
  const initIcons = () => {
    loadFavorites();
    setIcons();
  };

  const setIcons = (force = false) => {
    if (force) iconState.icons.length = 0;
    if (iconState.icons.length > 1) return;

    Object.keys(iconList).forEach((category) => {
      iconList[category].forEach((icon) => {
        iconState.icons.push({
          ...icon,
          category: category,
          favorite: isFavoriteIcon(icon.unicode),
        });
      });
    });
  };
  const getCurrentCategory = computed(() => {
    return iconState.category;
  });

  const setCurrentCategory = (category: string) => {
    iconState.category = category;
  };

  const getCategories = computed(() => {
    return Object.keys(iconList);
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

  return {
    getIcons,
    getCurrentCategory,
    getCategories,
    getTags,
    initIcons,
    setCurrentCategory,
    isFavoriteIcon,
    toggleFavoriteIcon,
  };
};
