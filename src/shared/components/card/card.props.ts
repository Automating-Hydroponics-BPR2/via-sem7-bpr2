export interface CardProps {
  id: string;
  title: string;
  imgSource?: string;
  description: string;
  date?: string;
  isFavorite?: boolean;
  showFavorite?: boolean;
  disabledFavoriteButton?: boolean;

  onAddToFavoritesClick?: (id: string) => void;
  onCardClick?: (id: string) => void;
}
