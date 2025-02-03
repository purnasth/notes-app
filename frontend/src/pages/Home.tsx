import React, { useState } from 'react';
import NotesCard from '../components/ui/NotesCard';
import Pagination from '../components/ui/Pagination';
import { IoAddOutline } from 'react-icons/io5';
import SingleNote from '../components/SingleNote';
import Error404 from '../layouts/Error404';
import { toast } from 'react-toastify';
import Navbar from '../layouts/Navbar';

const initialNotes = [
  {
    _id: '1',
    title: 'Interview for Associate Engineer',
    date: new Date().toDateString(),
    content:
      'The interview will be conducted by Leapfrog Technology for the position of Associate Software Engineer. The interview will be conducted in two rounds. The first round will be a written test and the second round will be a technical interview. On the first round, the written test is about the notes-app development. The notes-app is built with a PERN stack; PostgreSQL, Express, React, and Node.js.',
    tags: ['interview', 'leapfrog', 'associate engineer'],
    isPinned: true,
  },
  {
    _id: '2',
    title: 'On Boarding after Hiring',
    date: new Date().toDateString(),
    content:
      'After hiring, the onboarding process will start. The onboarding process will be conducted by the HR department. The onboarding process will include the introduction of the company, the introduction of the team, the introduction of the project, the introduction of the tools, and the introduction of the company policies.',
    tags: ['onboarding', 'hiring'],
    isPinned: false,
  },
  {
    _id: '3',
    title: 'Board Exam Routine',
    date: new Date().toDateString(),
    content:
      'The routine of the board exam has been published. The exam will start from 1st January 2022. The exam will be conducted in two shifts. The first shift will start at 9 AM and the second shift will start at 2 PM. The exam will be conducted in offline mode.',
    tags: ['exam', 'board exam', 'routine'],
    isPinned: false,
  },
  {
    _id: '4',
    title: 'Marvel: Doomsday',
    date: new Date().toDateString(),
    content:
      'The Marvel movie "Doomsday" has been released. The movie is about the end of the world. The movie is directed by Steven Spielberg. The movie has a rating of 4.5 out of 5. The movie has been released in 4K resolution.',
    tags: ['movie', 'marvel', 'doomsday'],
    isPinned: false,
  },
  {
    _id: '5',
    title: 'Chess Tournament',
    date: new Date().toDateString(),
    content:
      'The chess tournament will be conducted in the school. The tournament will start from 1st February 2022. The tournament will be conducted in two categories. The first category will be for juniors and the second category will be for seniors. The tournament will be conducted in offline mode.',
    tags: ['chess', 'tournament'],
    isPinned: false,
  },
  {
    _id: '6',
    title: 'Portfolio Design',
    date: new Date().toDateString(),
    content:
      'The portfolio design has been completed. The portfolio is designed with a minimalist design. The portfolio is designed with a dark theme. The portfolio is designed with a responsive design. The portfolio is designed with a mobile-first approach.',
    tags: ['portfolio', 'design'],
    isPinned: false,
  },
  {
    _id: '7',
    title: 'React Native Workshop',
    date: new Date().toDateString(),
    content:
      'The React Native workshop will be conducted by the IT Club. The workshop will start from 1st March 2022. The workshop will be conducted in two sessions. The first session will be about the introduction of React Native and the second session will be about the hands-on workshop.',
    tags: ['workshop', 'react native', 'it club'],
    isPinned: false,
  },
  {
    _id: '8',
    title: 'Web Development Bootcamp',
    date: new Date().toDateString(),
    content:
      'The web development bootcamp will be conducted by the Computer Club. The bootcamp will start from 1st April 2022. The bootcamp will be conducted in two phases. The first phase will be about the front-end development and the second phase will be about the back-end development.',
    tags: ['bootcamp', 'web development', 'computer club'],
    isPinned: false,
  },
  {
    _id: '9',
    title: 'Hackathon Event',
    date: new Date().toDateString(),
    content:
      'The hackathon event will be conducted by the Programming Club. The event will start from 1st May 2022. The event will be conducted in two categories. The first category will be for juniors and the second category will be for seniors. The event will be conducted in offline mode.',
    tags: ['hackathon', 'event', 'programming club'],
    isPinned: false,
  },
];

const Home: React.FC = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState<(typeof notes)[0] | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = () => {
    toast.success('Note deleted successfully!');
    handleCloseModal();
  };

  const handlePin = (noteId: string) => {
    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, isPinned: !note.isPinned } : note,
    );
    setNotes(updatedNotes);
    toast.success(
      updatedNotes.find((note) => note._id === noteId)?.isPinned
        ? 'Note pinned successfully!'
        : 'Note unpinned successfully!',
    );
    handleCloseModal();
  };

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
            {notes.map((note) => (
              <NotesCard
                key={note._id}
                title={note.title}
                date={note.date}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEditNoteClick(note)}
                onDelete={handleDelete}
                onPin={() => handlePin(note._id)}
                onClick={() => handleNoteClick(note)}
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
          title={selectedNote?.title || ''}
          date={selectedNote?.date || new Date().toDateString()}
          content={selectedNote?.content || ''}
          tags={selectedNote?.tags || []}
          isPinned={selectedNote?.isPinned || false}
          onClose={handleCloseModal}
          onEdit={() => handleEditNoteClick(selectedNote!)}
          onDelete={handleDelete}
          onPin={() => handlePin(selectedNote?._id || '')}
          isCreatingNewNote={isCreatingNewNote}
          isEditing={isEditing}
        />
      )}
    </>
  );
};

export default Home;
