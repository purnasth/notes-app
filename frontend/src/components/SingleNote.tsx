import React, { useState } from 'react';
import { TbPinFilled, TbPin } from 'react-icons/tb';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import Modal from './ui/Modal';

interface SingleNoteProps {
  title: string;
  date: string;
  content: string;
  tags?: string[];
  isPinned?: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
  isCreatingNewNote?: boolean;
  isEditing?: boolean; // New prop to handle edit mode
}

const SingleNote: React.FC<SingleNoteProps> = ({
  title,
  date,
  content,
  tags = [],
  isPinned = false,
  onClose,
  onEdit,
  onDelete,
  onPin,
  isCreatingNewNote = false,
  isEditing = false, // Default to false
}) => {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [noteTags, setNoteTags] = useState(tags);
  const [isNotePinned, setIsNotePinned] = useState(isPinned);

  const handleSave = () => {
    console.log('Note Saved:', {
      noteTitle,
      noteContent,
      noteTags,
      isNotePinned,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="space-y-6">
        {/* Read-Only Mode (when opened from NotesCard and not editing) */}
        {!isCreatingNewNote && !isEditing && (
          <>
            <div>
              <h3 className="font-body text-2xl font-semibold">{title}</h3>
              <p className="text-pretty text-sm text-gray-500">{date}</p>
            </div>
            <p className="max-h-96 overflow-y-auto text-pretty text-lg leading-relaxed">
              {content}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2 text-sm font-normal text-amber-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* Edit/Create Mode (when opened from + button or Edit button) */}
        {(isCreatingNewNote || isEditing) && (
          <>
            {/* Title */}
            <div>
              <label className="block text-base font-semibold text-dark">
                Title
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder='eg. "I have a meeting at 2 PM"'
                className="mt-1 w-full rounded-md border border-dark/10 p-2 focus:border-amber-400 focus:outline-none"
                maxLength={60}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-base font-semibold text-dark">
                Content
              </label>
              <textarea
                value={noteContent}
                placeholder='eg. "Meeting with Purna at 2 PM in the conference room."'
                onChange={(e) => setNoteContent(e.target.value)}
                className="mt-1 max-h-60 w-full rounded-md border border-dark/10 p-2 focus:border-amber-400 focus:outline-none"
                rows={6}
                maxLength={375}
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-base font-semibold text-dark">
                Categories
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {['work', 'personal', 'urgent'].map((tag) => (
                  <label key={tag} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="accent-amber-400"
                      checked={noteTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNoteTags([...noteTags, tag]);
                        } else {
                          setNoteTags(noteTags.filter((t) => t !== tag));
                        }
                      }}
                    />
                    <span className="select-none text-sm capitalize">
                      {tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <hr />

        {/* Buttons */}
        <div className="flex w-full items-center justify-between gap-2">
          {isCreatingNewNote || isEditing ? (
            <button
              onClick={handleSave}
              className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-4 py-2 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              {isCreatingNewNote ? 'Create Note' : 'Save Changes'}
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-4 py-2 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              Edit Note
              <MdEdit className="text-base" />
            </button>
          )}
          <div className="flex items-center gap-3">
            {!isCreatingNewNote && (
              <button
                onClick={onDelete}
                className="transition-200 flex aspect-square items-center justify-center gap-1 rounded-full border border-red-400 bg-red-100 p-2 font-medium text-red-600 hover:bg-red-500 hover:text-white focus:outline-none"
              >
                <MdDeleteOutline className="text-xl" />
              </button>
            )}
            <button
              onClick={() => {
                setIsNotePinned(!isNotePinned);
                onPin();
              }}
              className={`transition-200 flex aspect-square items-center justify-center gap-1 rounded-full border-2 border-amber-400 p-2 font-medium ${
                isNotePinned
                  ? 'bg-amber-400 text-dark'
                  : 'bg-amber-50 text-amber-400'
              } hover:bg-amber-300 hover:text-dark focus:outline-none`}
            >
              {isNotePinned ? (
                <TbPinFilled className="text-xl" />
              ) : (
                <TbPin className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SingleNote;
