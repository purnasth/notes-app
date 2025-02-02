export interface NoteProps {
    title: string;
    date: string;
    content: string;
    tags?: string[];
    isPinned?: boolean;
    onClose?: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onPin: () => void;
    onClick?: () => void;
    isCreatingNewNote?: boolean;
    isEditing?: boolean;
  }