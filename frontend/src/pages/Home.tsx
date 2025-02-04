import React, { useEffect, useState } from 'react';
import NotesCard from '../components/ui/NotesCard';
import Pagination from '../components/ui/Pagination';
import { IoAddOutline } from 'react-icons/io5';
import SingleNote from '../components/SingleNote';
import Error404 from '../layouts/Error404';
import { toast } from 'react-toastify';
import Navbar from '../layouts/Navbar';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../utils/api';
import { NoteProps } from '../interfaces/types';

// const initialNotes = [
//   {
//     id: '1',
//     title: 'Interview for Associate Engineer',
//     date: new Date().toDateString(),
//     content:
//       'The interview will be conducted by Leapfrog Technology for the position of Associate Software Engineer. The interview will be conducted in two rounds. The first round will be a written test and the second round will be a technical interview. On the first round, the written test is about the notes-app development. The notes-app is built with a PERN stack; PostgreSQL, Express, React, and Node.js.',
//     categories: ['interview', 'leapfrog', 'associate engineer'],
//     isPinned: true,
//   },
//   {
//     id: '2',
//     title: 'On Boarding after Hiring',
//     date: new Date().toDateString(),
//     content:
//       'After hiring, the onboarding process will start. The onboarding process will be conducted by the HR department. The onboarding process will include the introduction of the company, the introduction of the team, the introduction of the project, the introduction of the tools, and the introduction of the company policies.',
//     categories: ['onboarding', 'hiring'],
//     isPinned: false,
//   },
//   {
//     id: '3',
//     title: 'Board Exam Routine',
//     date: new Date().toDateString(),
//     content:
//       'The routine of the board exam has been published. The exam will start from 1st January 2022. The exam will be conducted in two shifts. The first shift will start at 9 AM and the second shift will start at 2 PM. The exam will be conducted in offline mode.',
//     categories: ['exam', 'board exam', 'routine'],
//     isPinned: false,
//   },
//   {
//     id: '4',
//     title: 'Marvel: Doomsday',
//     date: new Date().toDateString(),
//     content:
//       'The Marvel movie "Doomsday" has been released. The movie is about the end of the world. The movie is directed by Steven Spielberg. The movie has a rating of 4.5 out of 5. The movie has been released in 4K resolution.',
//     categories: ['movie', 'marvel', 'doomsday'],
//     isPinned: false,
//   },
//   {
//     id: '5',
//     title: 'Chess Tournament',
//     date: new Date().toDateString(),
//     content:
//       'The chess tournament will be conducted in the school. The tournament will start from 1st February 2022. The tournament will be conducted in two categories. The first category will be for juniors and the second category will be for seniors. The tournament will be conducted in offline mode.',
//     categories: ['chess', 'tournament'],
//     isPinned: false,
//   },
//   {
//     id: '6',
//     title: 'Portfolio Design',
//     date: new Date().toDateString(),
//     content:
//       'The portfolio design has been completed. The portfolio is designed with a minimalist design. The portfolio is designed with a dark theme. The portfolio is designed with a responsive design. The portfolio is designed with a mobile-first approach.',
//     categories: ['portfolio', 'design'],
//     isPinned: false,
//   },
//   {
//     id: '7',
//     title: 'React Native Workshop',
//     date: new Date().toDateString(),
//     content:
//       'The React Native workshop will be conducted by the IT Club. The workshop will start from 1st March 2022. The workshop will be conducted in two sessions. The first session will be about the introduction of React Native and the second session will be about the hands-on workshop.',
//     categories: ['workshop', 'react native', 'it club'],
//     isPinned: false,
//   },
//   {
//     id: '8',
//     title: 'Web Development Bootcamp',
//     date: new Date().toDateString(),
//     content:
//       'The web development bootcamp will be conducted by the Computer Club. The bootcamp will start from 1st April 2022. The bootcamp will be conducted in two phases. The first phase will be about the front-end development and the second phase will be about the back-end development.',
//     categories: ['bootcamp', 'web development', 'computer club'],
//     isPinned: false,
//   },
//   {
//     id: '9',
//     title: 'Hackathon Event',
//     date: new Date().toDateString(),
//     content:
//       'The hackathon event will be conducted by the Programming Club. The event will start from 1st May 2022. The event will be conducted in two categories. The first category will be for juniors and the second category will be for seniors. The event will be conducted in offline mode.',
//     categories: ['hackathon', 'event', 'programming club'],
//     isPinned: false,
//   },
// ];

const Home: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [selectedNote, setSelectedNote] = useState<(typeof notes)[0] | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        toast.error('Failed to fetch notes');
      }
    };
    fetchNotes();
  }, []);

  // Handle note creation
  const handleCreateNote = async (note: {
    title: string;
    content: string;
    categories: string[];
  }) => {
    try {
      const newNote = await createNote(note);
      setNotes([...notes, newNote]);
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
      setNotes(notes.map((n) => (n.id === id ? note : n)));
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
      setNotes(notes.filter((note) => note.id !== id));
      toast.success('Note deleted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleNoteClick = (note: (typeof notes)[0]) => {
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

  const handleEditNoteClick = (note: (typeof notes)[0]) => {
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

  const handlePin = (noteId: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note,
    );
    setNotes(updatedNotes);
    toast.success(
      updatedNotes.find((note) => note.id === noteId)?.isPinned
        ? 'Note pinned successfully!'
        : 'Note unpinned successfully!',
    );
    handleCloseModal();
  };

  // Sort notes by pinned status and created date
  const sortedNotes = notes.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return a.isPinned ? -1 : 1;
  });

  return (
    <>
      <Navbar />
      {notes.length < 1 ? (
        <Error404
          message={`Start creating your first note! Click on the '+' button below to add a new note that could be your thoughts, ideas, or anything you want to remember.`}
        />
      ) : (
        <main>
          <section className="transition-linear w-fit columns-1 sm:columns-2 md:gap-4 lg:columns-2 xl:columns-3">
            {sortedNotes.map((note) => (
              <NotesCard
                key={note.id}
                id={note.id}
                title={note.title}
                date={note.date}
                content={note.content}
                categories={note.categories}
                isPinned={note.isPinned}
                created_at={note.created_at}
                user_id={note.user_id}
                onEdit={() => handleEditNoteClick(note)}
                onDelete={() => note && handleDeleteNote(note.id)}
                onPin={() => handlePin(note.id)}
                onClick={() => handleNoteClick(note)}
                onClose={handleCloseModal}
              />
            ))}
          </section>
          <Pagination />
        </main>
      )}
      <button
        onClick={handleAddNoteClick}
        className="transition-200 fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full border border-amber-400 bg-amber-400 text-dark shadow hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        <IoAddOutline className="scale-125 text-2xl" />
      </button>

      {isModalOpen && (
        <SingleNote
          id={selectedNote?.id || ''}
          created_at={selectedNote?.created_at || new Date().toDateString()}
          user_id={selectedNote?.user_id || ''}
          title={selectedNote?.title || ''}
          date={selectedNote?.created_at || new Date().toDateString()}
          content={selectedNote?.content || ''}
          categories={selectedNote?.categories || []}
          isPinned={selectedNote?.isPinned || false}
          onClose={() => setIsModalOpen(false)}
          onEdit={() => {
            setSelectedNote(selectedNote);
            setIsEditing(true);
          }}
          onDelete={() => selectedNote && handleDeleteNote(selectedNote.id)}
          // onPin={() => selectedNote && handlePinNote(selectedNote.id)}
          onPin={() => selectedNote && handlePin(selectedNote.id)}
          isCreatingNewNote={isCreatingNewNote}
          isEditing={isEditing}
          onSubmit={(data) => {
            if (isCreatingNewNote) {
              handleCreateNote({
                ...data,
                categories: (data.categories || []).filter(
                  (category): category is string => !!category,
                ),
              });
            } else if (selectedNote) {
              handleUpdateNote(selectedNote.id, {
                ...data,
                categories: (data.categories || []).filter(
                  (category): category is string => !!category,
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
