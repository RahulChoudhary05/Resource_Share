import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Book } from 'lucide-react';

const subjects = {
  1: ['Mathematics I', 'Physics', 'Chemistry', 'Basic Electronics'],
  2: ['Mathematics II', 'Programming', 'English', 'Engineering Drawing'],
  3: ['Data Structures', 'Digital Logic', 'Computer Architecture', 'Discrete Mathematics'],
  4: ['Operating Systems', 'Database Systems', 'Computer Networks', 'Theory of Computation'],
  5: ['Software Engineering', 'Web Development', 'Artificial Intelligence', 'Computer Graphics'],
  6: ['Compiler Design', 'Machine Learning', 'Information Security', 'Cloud Computing'],
  7: ['Big Data Analytics', 'Internet of Things', 'Mobile Computing', 'Project Management'],
  8: ['Distributed Systems', 'Natural Language Processing', 'Blockchain Technology', 'Ethics in Computing']
};

const SemesterView = () => {
  const { id } = useParams<{ id: string }>();
  const semesterSubjects = subjects[Number(id) as keyof typeof subjects] || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Semester {id} Subjects
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {semesterSubjects.map((subject) => (
          <Link
            key={subject}
            to={`/subject/${id}/${encodeURIComponent(subject)}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <Book className="h-8 w-8 text-indigo-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{subject}</h2>
                <p className="text-gray-600">Access study materials</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SemesterView;