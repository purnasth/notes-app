import React, { useEffect } from 'react';
import { TbPinFilled, TbPin } from 'react-icons/tb';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './ui/Modal';
import { noteSchema } from '../utils/validationSchemas';
import { NoteProps } from '../interfaces/types';

type NoteFormData = yup.InferType<typeof noteSchema>;

interface SingleNoteProps extends NoteProps {
  onSubmit: SubmitHandler<NoteFormData>;
}

const SingleNote: React.FC<SingleNoteProps> = ({
  title,
  created_at,
  modified_at,
  content,
  categories = [],
  isPinned = false,
  onClose = () => {},
  onEdit,
  onDelete,
  onPin,
  isCreatingNewNote = false,
  isEditing = false,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<NoteFormData>({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      title,
      content,
      categories,
    },
  });

  useEffect(() => {
    reset({ title, content, categories });
  }, [title, content, categories, reset]);

  const handleSave: SubmitHandler<NoteFormData> = (data) => {
    if (
      data.title === title &&
      data.content === content &&
      JSON.stringify(data.categories) === JSON.stringify(categories)
    ) {
      toast.info('No changes detected.');
      return;
    }
    onSubmit(data);
  };

  const formFields = [
    {
      name: 'title',
      type: 'text',
      placeholder: 'eg. "I have a meeting at 2 PM"',
      label: 'Title',
      maxLength: 60,
      error: errors.title?.message,
    },
    {
      name: 'content',
      type: 'textarea',
      placeholder: 'eg. "Meeting with Purna at 2 PM in the conference room."',
      label: 'Content',
      rows: 6,
      maxLength: 375,
      error: errors.content?.message,
    },
  ];

  return (
    <Modal onClose={onClose}>
      <div className="space-y-6">
        {!isCreatingNewNote && !isEditing && (
          <>
            <div>
              <h3 className="font-body text-2xl font-semibold">{title}</h3>
              <p className="text-pretty text-sm text-gray-500">
                {modified_at ? `${modified_at}` : `${created_at}`}
              </p>
            </div>
            <p className="max-h-96 overflow-y-auto text-pretty text-lg leading-relaxed">
              {content}
            </p>
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2 text-sm font-normal text-amber-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <hr />
            <div className="flex w-full items-center justify-between gap-2">
              <button
                onClick={onEdit}
                className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-4 py-2 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
              >
                Edit Note
                <MdEdit className="text-base" />
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onDelete}
                  className="transition-200 flex aspect-square items-center justify-center gap-1 rounded-full border border-red-400 bg-red-100 p-2 font-medium text-red-600 hover:bg-red-500 hover:text-white focus:outline-none"
                >
                  <MdDeleteOutline className="text-xl" />
                </button>
                <button
                  onClick={onPin}
                  className={`transition-200 flex aspect-square items-center justify-center gap-1 rounded-full border-2 border-amber-400 p-2 font-medium ${
                    isPinned
                      ? 'bg-amber-400 text-dark'
                      : 'bg-amber-50 text-amber-400'
                  } hover:bg-amber-300 hover:text-dark focus:outline-none`}
                >
                  {isPinned ? (
                    <TbPinFilled className="text-xl" />
                  ) : (
                    <TbPin className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {(isCreatingNewNote || isEditing) && (
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.name}>
                <label
                  className={`block text-base font-medium ${
                    field.error ? 'text-red-500' : 'text-dark'
                  }`}
                >
                  {field.error || field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    {...register(field.name as keyof NoteFormData)}
                    placeholder={field.placeholder}
                    className={`mt-1 w-full rounded-md border border-dark/10 p-2 focus:border-amber-400 focus:outline-none ${
                      field.error
                        ? 'border-red-500 placeholder:text-red-500'
                        : ''
                    }`}
                    rows={field.rows}
                    // maxLength={field.maxLength}
                  />
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name as keyof NoteFormData)}
                    placeholder={field.placeholder}
                    className={`mt-1 w-full rounded-md border border-dark/10 p-2 focus:border-amber-400 focus:outline-none ${
                      field.error
                        ? 'border-red-500 placeholder:text-red-500'
                        : ''
                    }`}
                    // maxLength={field.maxLength}
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block text-base font-medium text-dark">
                Categories
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {['work', 'personal', 'study', 'reminder', 'ideas'].map(
                  (tag) => (
                    <label key={tag} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="accent-amber-400"
                        checked={watch('categories')?.includes(tag)}
                        onChange={(e) => {
                          const currentCategories = watch('categories') || [];
                          if (e.target.checked) {
                            setValue('categories', [...currentCategories, tag]);
                          } else {
                            setValue(
                              'categories',
                              currentCategories.filter((t) => t !== tag),
                            );
                          }
                        }}
                      />
                      <span className="select-none text-sm capitalize">
                        {tag}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between gap-2">
              <button
                type="submit"
                className="transition-200 flex items-center justify-center gap-1 rounded-full border border-blue-400 bg-blue-100 px-4 py-2 font-medium text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none"
              >
                {isCreatingNewNote ? 'Create Note' : 'Save Changes'}
              </button>
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
                  onClick={onPin}
                  className={`transition-200 flex aspect-square items-center justify-center gap-1 rounded-full border-2 border-amber-400 p-2 font-medium ${
                    isPinned
                      ? 'bg-amber-400 text-dark'
                      : 'bg-amber-50 text-amber-400'
                  } hover:bg-amber-300 hover:text-dark focus:outline-none`}
                >
                  {isPinned ? (
                    <TbPinFilled className="text-xl" />
                  ) : (
                    <TbPin className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default SingleNote;
