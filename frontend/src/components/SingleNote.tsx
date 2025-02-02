import React, { useEffect, useState } from 'react';
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

// Define the form data type
type NoteFormData = yup.InferType<typeof noteSchema>;

const SingleNote: React.FC<NoteProps> = ({
  title,
  date,
  content,
  tags = [],
  isPinned = false,
  onClose = () => {},
  onEdit,
  onDelete,
  onPin,
  isCreatingNewNote = false,
  isEditing = false,
}) => {
  const [initialValues, setInitialValues] = useState<NoteFormData>({
    title,
    content,
    tags,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NoteFormData>({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      title,
      content,
      tags,
    },
  });

  useEffect(() => {
    setInitialValues({ title, content, tags });
  }, [title, content, tags]);

  const handleSave: SubmitHandler<NoteFormData> = (data) => {
    if (
      data.title === initialValues.title &&
      data.content === initialValues.content &&
      JSON.stringify(data.tags) === JSON.stringify(initialValues.tags)
    ) {
      toast.info('No changes detected.');
      return;
    }

    console.log('Note Saved:', data);
    toast.success(
      isCreatingNewNote
        ? 'Note created successfully!'
        : 'Note updated successfully!',
    );
    onClose();
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
    <>
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

          {/* Edit/Create Mode (when opened from NotesCard and editing or creating) */}
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
                        field.error ? 'border-red-500' : ''
                      }`}
                      rows={field.rows}
                      maxLength={field.maxLength}
                    />
                  ) : (
                    <input
                      type={field.type}
                      {...register(field.name as keyof NoteFormData)}
                      placeholder={field.placeholder}
                      className={`mt-1 w-full rounded-md border border-dark/10 p-2 focus:border-amber-400 focus:outline-none ${
                        field.error ? 'border-red-500' : ''
                      }`}
                      maxLength={field.maxLength}
                    />
                  )}
                </div>
              ))}

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
                        checked={watch('tags')?.includes(tag)}
                        onChange={(e) => {
                          const currentTags = watch('tags') || [];
                          if (e.target.checked) {
                            setValue('tags', [...currentTags, tag]);
                          } else {
                            setValue(
                              'tags',
                              currentTags.filter((t) => t !== tag),
                            );
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
    </>
  );
};

export default SingleNote;
