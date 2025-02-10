// import React, { useEffect, useState } from 'react';
// import NotesCard from '../components/ui/NotesCard';
// import Pagination from '../components/ui/Pagination';
// import SkeletonLoader from '../components/ui/SkeletonLoader';
// import { IoAddOutline } from 'react-icons/io5';
// import SingleNote from '../components/SingleNote';
// import Error404 from '../layouts/Error404';
// import { toast } from 'react-toastify';
// import {
//   getNotes,
//   createNote,
//   updateNote,
//   deleteNote,
//   togglePin,
// } from '../utils/api';
// import { NoteProps } from '../interfaces/types';
// import moment from 'moment';

// interface HomeProps {
//   notes: NoteProps[];
//   setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
//   page: number;
//   total: number;
//   limit: number;
//   onPageChange: (newPage: number) => void;
//   search: string;
// }

// const Home: React.FC<HomeProps> = ({
//   notes,
//   setNotes,
//   page,
//   total,
//   limit,
//   onPageChange,
//   search,
// }) => {
//   const [selectedNote, setSelectedNote] = useState<NoteProps | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Add loading state

//   // Fetch notes on component mount and when page or search changes
//   useEffect(() => {
//     const fetchNotes = async () => {
//       setIsLoading(true); // Set loading to true before fetching
//       try {
//         const response = await getNotes(
//           search,
//           [],
//           'modified_at',
//           'desc',
//           page,
//           limit,
//         );
//         const notesArray = Array.isArray(response?.notes) ? response.notes : [];
//         setNotes(notesArray);
//       } catch (error) {
//         toast.error('Failed to fetch notes');
//         setNotes([]);
//       } finally {
//         setIsLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchNotes();
//   }, [page, search, limit]);

//   // Handle note creation
//   const handleCreateNote = async (note: {
//     title: string;
//     content: string;
//     categories: string[];
//   }) => {
//     try {
//       const newNote = await createNote(note);
//       setNotes((prevNotes) => [...prevNotes, newNote]);
//       toast.success('Note created successfully!');
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error('Failed to create note');
//     }
//   };

//   // Handle note update
//   const handleUpdateNote = async (
//     id: string,
//     updatedNote: Partial<NoteProps>,
//   ) => {
//     try {
//       const note = await updateNote(id, {
//         title: updatedNote.title || '',
//         content: updatedNote.content || '',
//         categories: updatedNote.categories || [],
//       });
//       setNotes((prevNotes) =>
//         prevNotes.map((n) => (n.id === id ? { ...n, ...note } : n)),
//       );
//       toast.success('Note updated successfully!');
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error('Failed to update note');
//     }
//   };

//   // Handle note deletion
//   const handleDeleteNote = async (id: string) => {
//     try {
//       await deleteNote(id);
//       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
//       toast.success('Note deleted successfully!');
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error('Failed to delete note');
//     }
//   };

//   // Handle pin toggle
//   // Handle pin toggle
//   const handlePin = async (noteId: string) => {
//     try {
//       const pinnedNotesCount = notes.filter((note) => note.isPinned).length;
//       const noteToPin = notes.find((note) => note.id === noteId);

//       if (noteToPin && !noteToPin.isPinned && pinnedNotesCount >= 9) {
//         toast.error('You can only pin up to 9 notes.');
//         return;
//       }

//       const updatedNote = await togglePin(noteId);

//       // Update the notes state with the new pin status
//       setNotes((prevNotes) =>
//         prevNotes.map((note) =>
//           note.id === noteId
//             ? { ...note, isPinned: updatedNote.isPinned } // Update the pin status
//             : note,
//         ),
//       );

//       // Display the correct toast message
//       toast.success(
//         updatedNote.isPinned
//           ? 'Note pinned successfully!'
//           : 'Note unpinned successfully!',
//       );
//     } catch (error) {
//       toast.error('Failed to toggle pin status');
//     }
//     setIsModalOpen(false);
//   };

//   const handleNoteClick = (note: NoteProps) => {
//     setSelectedNote(note);
//     setIsModalOpen(true);
//     setIsCreatingNewNote(false);
//     setIsEditing(false);
//   };

//   const handleAddNoteClick = () => {
//     setSelectedNote(null);
//     setIsModalOpen(true);
//     setIsCreatingNewNote(true);
//     setIsEditing(false);
//   };

//   const handleEditNoteClick = (note: NoteProps) => {
//     setSelectedNote(note);
//     setIsModalOpen(true);
//     setIsCreatingNewNote(false);
//     setIsEditing(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedNote(null);
//     setIsCreatingNewNote(false);
//     setIsEditing(false);
//   };

//   const pinnedNotes = notes.filter((note) => note.isPinned);
//   const unpinnedNotes = notes.filter((note) => !note.isPinned);

//   // const sortedNotes = [...notes].sort((a, b) => (b.isPinned ? 1 : -1));

//   // Sort notes by pinned status and others as the same order they were sent from the App component
//   // const sortedNotes = [...notes].sort((a, b) => {
//   //   if (a.isPinned && !b.isPinned) {
//   //     return -1;
//   //   }
//   //   if (!a.isPinned && b.isPinned) {
//   //     return 1;
//   //   }
//   //   return 0;
//   // });

//   return (
//     <>
//       {isLoading ? (
//         <main>
//           <section className="transition-linear w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4">
//             {Array.from({ length: limit }).map((_, index) => (
//               <SkeletonLoader key={index} />
//             ))}
//           </section>
//         </main>
//       ) : notes.length > 0 ? (
//         <main className="z-auto">
//           {/* <span className="text-base text-dark p-3 inline-block">
//             {total} {total === 1 ? 'note' : 'notes'} found.
//           </span> */}
//           <section className="space-y-10">
//             {/* <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"> */}
//             {pinnedNotes.length > 0 && (
//               <div>
//                 <h2 className="mb-2 p-3 text-lg font-semibold text-dark md:text-lg">
//                   {pinnedNotes.length} Pinned{' '}
//                   {pinnedNotes.length === 1 ? 'Note' : 'Notes'}
//                 </h2>
//                 {/* <div className="transition-linear w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4"> */}
//                 <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
//                   {pinnedNotes.map((note) => (
//                     <NotesCard
//                       key={note.id}
//                       id={note.id}
//                       title={note.title}
//                       content={note.content}
//                       categories={note.categories}
//                       isPinned={note.isPinned}
//                       created_at={moment(note.created_at).format(
//                         'h:mm A, MMM DD, YYYY',
//                       )}
//                       modified_at={moment(note.modified_at).format(
//                         'h:mm A, MMM DD, YYYY',
//                       )}
//                       user_id={note.user_id}
//                       onEdit={() => handleEditNoteClick(note)}
//                       onDelete={() => handleDeleteNote(note.id)}
//                       onPin={() => handlePin(note.id)}
//                       onClick={() => handleNoteClick(note)}
//                       onClose={handleCloseModal}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Unpinned Notes Section */}
//             {unpinnedNotes.length > 0 && (
//               <div>
//                 <h2 className="mb-2 p-3 text-lg font-semibold text-dark md:text-lg">
//                   {unpinnedNotes.length} Other{' '}
//                   {unpinnedNotes.length === 1 ? 'Note' : 'Notes'}
//                 </h2>
//                 {/* <div className="transition-linear w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4"> */}
//                 <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
//                   {unpinnedNotes.map((note) => (
//                     <NotesCard
//                       key={note.id}
//                       id={note.id}
//                       title={note.title}
//                       content={note.content}
//                       categories={note.categories}
//                       isPinned={note.isPinned}
//                       created_at={moment(note.created_at).format(
//                         'h:mm A, MMM DD, YYYY',
//                       )}
//                       modified_at={moment(note.modified_at).format(
//                         'h:mm A, MMM DD, YYYY',
//                       )}
//                       user_id={note.user_id}
//                       onEdit={() => handleEditNoteClick(note)}
//                       onDelete={() => handleDeleteNote(note.id)}
//                       onPin={() => handlePin(note.id)}
//                       onClick={() => handleNoteClick(note)}
//                       onClose={handleCloseModal}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>
//           <Pagination
//             currentPage={page}
//             totalPages={Math.ceil(total / limit)}
//             onPageChange={onPageChange}
//           />
//         </main>
//       ) : (
//         <Error404
//           message={
//             search
//               ? `Oops! No notes found for "${search}".`
//               : `Start creating your first note! Click on the '+' button below to add a new note that could be your thoughts, ideas, or anything you want to remember.`
//           }
//         />
//       )}
//       <button
//         type="button"
//         aria-label="Add Note"
//         onClick={handleAddNoteClick}
//         className="transition-200 fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full border border-amber-400 bg-amber-400 text-dark shadow hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
//       >
//         <IoAddOutline className="scale-125 text-2xl" />
//       </button>

//       {isModalOpen && (
//         <SingleNote
//           id={selectedNote?.id || ''}
//           created_at={moment(selectedNote?.created_at).format(
//             'h:mm A, MMM DD, YYYY',
//           )}
//           user_id={selectedNote?.user_id || ''}
//           title={selectedNote?.title || ''}
//           modified_at={moment(selectedNote?.modified_at).format(
//             'h:mm A, MMM DD, YYYY',
//           )}
//           content={selectedNote?.content || ''}
//           categories={selectedNote?.categories || []}
//           isPinned={selectedNote?.isPinned || false}
//           onClose={handleCloseModal}
//           onEdit={() => setIsEditing(true)}
//           onDelete={() => selectedNote && handleDeleteNote(selectedNote.id)}
//           onPin={() => selectedNote && handlePin(selectedNote.id)}
//           isCreatingNewNote={isCreatingNewNote}
//           isEditing={isEditing}
//           onSubmit={(data) => {
//             if (isCreatingNewNote) {
//               handleCreateNote({
//                 ...data,
//                 categories: (data.categories || []).filter(
//                   (category): category is string => category !== undefined,
//                 ),
//               });
//             } else if (selectedNote) {
//               handleUpdateNote(selectedNote.id, {
//                 ...data,
//                 categories: (data.categories || []).filter(
//                   (category): category is string => category !== undefined,
//                 ),
//               });
//             }
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Home;

// ? Pinned notes shown on every pages
import React, { useEffect, useState } from 'react';
import NotesCard from '../components/ui/NotesCard';
import Pagination from '../components/ui/Pagination';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { IoAddOutline } from 'react-icons/io5';
import SingleNote from '../components/SingleNote';
import Error404 from '../layouts/Error404';
import { toast } from 'react-toastify';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
} from '../utils/api';
import { NoteProps } from '../interfaces/types';
import moment from 'moment';

interface HomeProps {
  notes: NoteProps[];
  setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  page: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  search: string;
}

const Home: React.FC<HomeProps> = ({
  notes,
  setNotes,
  page,
  total,
  limit,
  onPageChange,
  search,
}) => {
  const [selectedNote, setSelectedNote] = useState<NoteProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [pinnedNotes, setPinnedNotes] = useState<NoteProps[]>([]);

  // Fetch notes on component mount and when page or search changes
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await getNotes(
          search,
          [],
          'modified_at',
          'desc',
          page,
          limit,
        );
        const notesArray = Array.isArray(response?.notes) ? response.notes : [];
        setNotes(notesArray);
      } catch (error) {
        toast.error('Failed to fetch notes');
        setNotes([]);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchNotes();
  }, [page, search, limit]);

  // Fetch pinned notes on component mount
  useEffect(() => {
    const fetchPinnedNotes = async () => {
      try {
        const response = await getNotes(
          '',
          [],
          'modified_at',
          'desc',
          1,
          1000, // Fetch a large number to ensure all pinned notes are retrieved
        );
        const notesArray = Array.isArray(response?.notes) ? response.notes : [];
        const pinned: NoteProps[] = notesArray.filter(
          (note: NoteProps) => note.isPinned,
        );
        setPinnedNotes(pinned);
      } catch (error) {
        toast.error('Failed to fetch pinned notes');
        setPinnedNotes([]);
      }
    };

    fetchPinnedNotes();
  }, []);

  // Handle note creation
  const handleCreateNote = async (note: {
    title: string;
    content: string;
    categories: string[];
  }) => {
    try {
      const newNote = await createNote(note);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      toast.success('Note created successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to create note');
    }
  };

  // Handle note update
  const handleUpdateNote = async (
    id: string,
    updatedNote: Partial<NoteProps>,
  ) => {
    try {
      const note = await updateNote(id, {
        title: updatedNote.title || '',
        content: updatedNote.content || '',
        categories: updatedNote.categories || [],
      });
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? { ...n, ...note } : n)),
      );
      toast.success('Note updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update note');
    }
  };

  // Handle note deletion
  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setPinnedNotes((prevPinnedNotes) =>
        prevPinnedNotes.filter((note) => note.id !== id),
      );
      toast.success('Note deleted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  // Handle pin toggle
  const handlePin = async (noteId: string) => {
    try {
      const pinnedNotesCount = pinnedNotes.length;
      const noteToPin = notes.find((note) => note.id === noteId);

      if (noteToPin && !noteToPin.isPinned && pinnedNotesCount >= 9) {
        toast.error('You can only pin up to 9 notes.');
        return;
      }

      const updatedNote = await togglePin(noteId);

      // Update the notes state with the new pin status
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId
            ? { ...note, isPinned: updatedNote.isPinned } // Update the pin status
            : note,
        ),
      );

      // Update the pinned notes state
      if (updatedNote.isPinned) {
        setPinnedNotes((prevPinnedNotes) => [...prevPinnedNotes, updatedNote]);
      } else {
        setPinnedNotes((prevPinnedNotes) =>
          prevPinnedNotes.filter((note) => note.id !== noteId),
        );
      }

      // Display the correct toast message
      toast.success(
        updatedNote.isPinned
          ? 'Note pinned successfully!'
          : 'Note unpinned successfully!',
      );
    } catch (error) {
      toast.error('Failed to toggle pin status');
    }
    setIsModalOpen(false);
  };

  const handleNoteClick = (note: NoteProps) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setIsCreatingNewNote(false);
    setIsEditing(false);
  };

  const handleAddNoteClick = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
    setIsCreatingNewNote(true);
    setIsEditing(false);
  };

  const handleEditNoteClick = (note: NoteProps) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setIsCreatingNewNote(false);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setIsCreatingNewNote(false);
    setIsEditing(false);
  };

  const unpinnedNotes = notes.filter((note) => !note.isPinned);

  return (
    <>
      {isLoading ? (
        <main>
          <section className="transition-linear w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4">
            {Array.from({ length: limit }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </section>
        </main>
      ) : notes.length > 0 ? (
        <main className="z-auto">
          <section className="space-y-10">
            {pinnedNotes.length > 0 && (
              <div>
                <h2 className="mb-2 p-3 text-lg font-semibold text-dark md:text-lg">
                  {pinnedNotes.length} Pinned{' '}
                  {pinnedNotes.length === 1 ? 'Note' : 'Notes'}
                </h2>
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {pinnedNotes.map((note) => (
                    <NotesCard
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      categories={note.categories}
                      isPinned={note.isPinned}
                      created_at={moment(note.created_at).format(
                        'h:mm A, MMM DD, YYYY',
                      )}
                      modified_at={moment(note.modified_at).format(
                        'h:mm A, MMM DD, YYYY',
                      )}
                      user_id={note.user_id}
                      onEdit={() => handleEditNoteClick(note)}
                      onDelete={() => handleDeleteNote(note.id)}
                      onPin={() => handlePin(note.id)}
                      onClick={() => handleNoteClick(note)}
                      onClose={handleCloseModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Unpinned Notes Section */}
            {unpinnedNotes.length > 0 && (
              <div>
                <h2 className="mb-2 p-3 text-lg font-semibold text-dark md:text-lg">
                  {unpinnedNotes.length} Other{' '}
                  {unpinnedNotes.length === 1 ? 'Note' : 'Notes'}
                </h2>
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {unpinnedNotes.map((note) => (
                    <NotesCard
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      categories={note.categories}
                      isPinned={note.isPinned}
                      created_at={moment(note.created_at).format(
                        'h:mm A, MMM DD, YYYY',
                      )}
                      modified_at={moment(note.modified_at).format(
                        'h:mm A, MMM DD, YYYY',
                      )}
                      user_id={note.user_id}
                      onEdit={() => handleEditNoteClick(note)}
                      onDelete={() => handleDeleteNote(note.id)}
                      onPin={() => handlePin(note.id)}
                      onClick={() => handleNoteClick(note)}
                      onClose={handleCloseModal}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={onPageChange}
          />
        </main>
      ) : (
        <Error404
          message={
            search
              ? `Oops! No notes found for "${search}".`
              : `Start creating your first note! Click on the '+' button below to add a new note that could be your thoughts, ideas, or anything you want to remember.`
          }
        />
      )}
      <button
        type="button"
        aria-label="Add Note"
        onClick={handleAddNoteClick}
        className="transition-200 fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full border border-amber-400 bg-amber-400 text-dark shadow hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        <IoAddOutline className="scale-125 text-2xl" />
      </button>

      {isModalOpen && (
        <SingleNote
          id={selectedNote?.id || ''}
          created_at={moment(selectedNote?.created_at).format(
            'h:mm A, MMM DD, YYYY',
          )}
          user_id={selectedNote?.user_id || ''}
          title={selectedNote?.title || ''}
          modified_at={moment(selectedNote?.modified_at).format(
            'h:mm A, MMM DD, YYYY',
          )}
          content={selectedNote?.content || ''}
          categories={selectedNote?.categories || []}
          isPinned={selectedNote?.isPinned || false}
          onClose={handleCloseModal}
          onEdit={() => setIsEditing(true)}
          onDelete={() => selectedNote && handleDeleteNote(selectedNote.id)}
          onPin={() => selectedNote && handlePin(selectedNote.id)}
          isCreatingNewNote={isCreatingNewNote}
          isEditing={isEditing}
          onSubmit={(data) => {
            if (isCreatingNewNote) {
              handleCreateNote({
                ...data,
                categories: (data.categories || []).filter(
                  (category): category is string => category !== undefined,
                ),
              });
            } else if (selectedNote) {
              handleUpdateNote(selectedNote.id, {
                ...data,
                categories: (data.categories || []).filter(
                  (category): category is string => category !== undefined,
                ),
              });
            }
          }}
        />
      )}
    </>
  );
};

export default Home;
