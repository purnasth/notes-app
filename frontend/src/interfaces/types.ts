export interface NoteProps {
  id: string;
  title: string;
  content: string;
  categories?: string[];
  isPinned?: boolean;
  onClose?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
  onClick?: () => void;
  isCreatingNewNote?: boolean;
  isEditing?: boolean;
  created_at: string;
  modified_at?: string;
  user_id: string;
}

export interface SearchBarProps {
  value: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
  setNavOpen: (isOpen: boolean) => void;
}
