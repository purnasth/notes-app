import { useState } from 'react';
import { TbPinFilled, TbPin } from 'react-icons/tb';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { NoteProps } from '../../interfaces/types';
import ConfirmModal from './ConfirmModal';

const NotesCard = ({
  title,
  created_at,
  modified_at,
  content,
  categories,
  isPinned,
  onEdit,
  onDelete,
  onPin,
  onClick,
}: NoteProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="overflow-hidden p-2">
        <div
          className="group relative origin-center space-y-6 rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 ease-linear"
          onClick={onClick}
        >
          <div className="space-y-1">
            <h3 className="font-body text-lg font-semibold">{title}</h3>
            <p className="text-xs">
              {modified_at && modified_at !== created_at
                ? `Last modified: ${modified_at}`
                : `Created: ${created_at}`}
            </p>
          </div>
          <p className="line-clamp-2 min-h-12 text-pretty">{content}</p>
          <div>
            {categories && (
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-amber-200 bg-amber-50 px-1 text-sm font-normal text-amber-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <hr />

          <div className="flex w-full items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Edit Note"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-4 py-1 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              Edit Note
              <MdEdit className="text-base" />
            </button>
            <button
              type="button"
              aria-label="Delete Note"
              onClick={handleDelete}
              className="transition-200 aspect-square rounded-full border border-red-400 bg-red-100 p-2 font-medium text-red-600 hover:bg-red-500 hover:text-white focus:outline-none"
            >
              <MdDeleteOutline className="text-base" />
            </button>
            <button
              type="button"
              aria-label="Pin Note"
              onClick={(e) => {
                e.stopPropagation();
                onPin();
              }}
              className={`transition-300 absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-dark focus:outline-none ${
                isPinned ? 'bg-amber-400 text-dark' : 'bg-amber-50'
              }`}
            >
              {isPinned ? (
                <TbPinFilled className="text-xl" />
              ) : (
                <TbPin className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Do you really want to delete this note? This process cannot be undone."
        />
      )}
    </>
  );
};

export default NotesCard;
