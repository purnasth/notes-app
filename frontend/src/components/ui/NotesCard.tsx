import { TbPinFilled, TbPin } from 'react-icons/tb';
import { MdDelete, MdEdit } from 'react-icons/md';
import { NoteProps } from '../../interfaces/types';

const NotesCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPin,
  onClick,
}: NoteProps) => {
  return (
    <div className="mb-4 overflow-hidden p-2">
      <div
        className="group relative origin-center space-y-6 rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 ease-linear"
        onClick={onClick}
      >
        <div>
          <h3 className="font-body text-lg font-semibold">{title}</h3>
          <p className="text-pretty text-sm">{date}</p>
        </div>
        <p className="line-clamp-4 text-pretty">{content}</p>
        <div>
          {tags && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
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
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-3 py-1 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
          >
            Edit Note
            <MdEdit className="text-base" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="transition-200 aspect-square rounded-full border border-red-400 bg-red-100 p-2 font-medium text-red-600 hover:bg-red-500 hover:text-white focus:outline-none"
          >
            <MdDelete className="text-base" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin();
            }}
            className={`absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-100 focus:outline-none ${
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
  );
};

export default NotesCard;
