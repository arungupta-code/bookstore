import React from "react";
import { Link } from "react-router-dom";
import { mcqSubjects } from "../data/mcqData";

function Freebook({ searchQuery = "" }) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const subjects = mcqSubjects.filter((subject) =>
    subject.title.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-10">
      <div>
        <h1 className="font-bold text-xl pb-2">Practice MCQ Questions</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Practice timed MCQ quizzes and check your score with answer key.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject.subjectId}
            className="card bg-base-100 shadow-sm hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-2 dark:border-white"
          >
            <img src={subject.image} alt={subject.title} />
            <div className="card-body">
              <h2 className="card-title">{subject.title}</h2>
              <p>{subject.description}</p>
              <div className="card-actions justify-end mt-2">
                <Link
                  to={`/mcq/${subject.subjectId}`}
                  className="cursor-pointer px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-700"
                >
                  Practice
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Freebook;
