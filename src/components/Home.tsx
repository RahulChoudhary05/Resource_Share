import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to StudyShare
        </h1>
        <p className="text-lg text-gray-600">
          Access and share academic resources with your peers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {semesters.map((semester) => (
          <Link
            key={semester}
            to={`/semester/${semester}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center">
              <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">
                Semester {semester}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;