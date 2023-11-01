export interface CardProps {
  id: string;
  title: string;
  width: string;
  height: string;

  imgSource?: string;
  description: string;
  date?: string;
  isFavorite?: boolean;
  showFavorite?: boolean;
  disabledFavoriteButton?: boolean;
  padding?: string;

  onAddToFavoritesClick?: (id: string) => void;
  onCardClick?: (id: string) => void;
}
