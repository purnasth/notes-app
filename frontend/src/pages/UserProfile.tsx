import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NoteProps } from '../interfaces/types';
import { getFirstName, getFullName, getInitials } from '../utils/helper';
import moment from 'moment';
import Header from '../layouts/Header';
// import human1 from '../assets/svg/human-1.svg';
// import human2 from '../assets/svg/human-2.svg';
// import { Link } from 'react-router-dom';
// import { TbBrandGithub } from 'react-icons/tb';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    email: string;
    created_at: string;
  };
  notes: NoteProps[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, notes }) => {
  // Count notes per category
  const categoryCounts: Record<string, number> = {};
  notes.forEach((note) => {
    note.categories?.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: '# of Notes',
        data: Object.values(categoryCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header page="profile" />

      <main className="relative h-screen">
        <div className="container flex flex-col justify-around gap-12 lg:flex-row">
          <div className="space-y-8">
            {/* <h1 className="mb-8 text-2xl capitalize">
              Welcome, {getFirstName(user.username)}!
            </h1> */}
            <h1 className="text-xl capitalize md:text-2xl">
              User Profile of {getFirstName(user.username)}!
            </h1>
            <div className="flex items-center justify-start gap-5">
              <span className="transition-300 relative flex size-20 items-center justify-center rounded-full border border-amber-500 bg-amber-100 p-2 text-3xl font-bold text-amber-500 outline outline-1 outline-offset-2 outline-amber-500/40 group-hover:scale-100">
                {getInitials(user.username)}
                <strong className="absolute -right-1 -top-0 flex aspect-square size-6 items-center justify-center rounded-full border border-amber-400 bg-amber-300 text-sm font-semibold text-dark">
                  {notes.length}
                </strong>
              </span>
              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {getFullName(user.username)}
                </h2>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="my-4">
              <p>
                <strong>Username: </strong>
                {user.username}
              </p>
              <p>
                <strong>Joined:</strong>{' '}
                {/* {new Date(user.created_at).toLocaleDateString()} */}
                {moment(user.created_at).format('MMM DD, YYYY')}
              </p>
            </div>
            <hr />
            <p>
              <strong className="font-semibold">{notes.length}</strong>
              {notes.length === 1 ? ' note' : ' notes'} created so far about{' '}
              <strong className="font-semibold">
                {Object.keys(categoryCounts).length}
              </strong>{' '}
              categories.
            </p>
          </div>
          <div className="w-full max-w-xl 2xl:max-w-3xl">
            <Pie data={chartData} />
            <p className="mt-8 text-center text-sm">
              fig. Pie chart showing the distribution of notes per category.
            </p>
          </div>
        </div>

        {/* <img
          src={human1}
          alt="Add Task"
          className="absolute bottom-0 left-0 -z-20 h-[60vh] w-auto object-contain mix-blend-darken"
        draggable="false"
        /> */}
        {/* <img
          src={human2}
          alt="Add Task"
          className="absolute bottom-0 right-0 -z-20 h-[70vh] w-auto object-contain mix-blend-darken"
          draggable="false"
        /> */}

        {/* <span className="fixed bottom-5 left-5 z-50 inline-block rounded-full bg-amber-500/20 py-2 pl-3 pr-2 text-sm">
          Source code available on{' '}
          <Link
            to="https://github.com/purnasth/notes-app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-200 inline-flex items-center justify-center gap-1 rounded-full border border-dark bg-[#333] px-1 text-white hover:bg-white hover:text-[#333]"
          >
            GitHub
            <TbBrandGithub />
          </Link>
        </span> */}
      </main>
    </>
  );
};

export default UserProfile;
