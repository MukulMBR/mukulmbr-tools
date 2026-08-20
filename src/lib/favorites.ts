const FAVORITES_KEY = "mbr_favorite_tools";

export function getFavoriteToolIds(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function isToolFavorite(toolId: string): boolean {
  const favorites = getFavoriteToolIds();
  return favorites.includes(toolId);
}

export function toggleFavoriteTool(toolId: string): boolean {
  try {
    const favorites = getFavoriteToolIds();
    let updated: string[];
    let isFav: boolean;

    if (favorites.includes(toolId)) {
      updated = favorites.filter((id) => id !== toolId);
      isFav = false;
    } else {
      updated = [...favorites, toolId];
      isFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("mbr:favorites-updated", { detail: updated }));
    return isFav;
  } catch {
    return false;
  }
}
