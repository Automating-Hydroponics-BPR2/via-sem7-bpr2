export interface CardProps {
  id: string;
  title: string;
  width: string;
  height: string;

  imgSource?: string;
  description: string;
  date?: string;
  padding?: string;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;

  onAddClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}
