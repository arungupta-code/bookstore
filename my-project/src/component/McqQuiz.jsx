import React, { useEffect, useMemo, useState } from "react";

const QUIZ_DURATION_SECONDS = 45 * 60;

function McqQuiz({ subjectTitle, questions = [] }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!hasStarted || isSubmitted) return undefined;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasStarted, isSubmitted]);

  const result = useMemo(() => {
    const total = questions.length;
    const correct = questions.filter(
      (q) => answers[q.id] && answers[q.id] === q.answer
    ).length;
    return { total, correct };
  }, [answers, questions]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSelect = (questionId, option) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleStart = () => {
    setHasStarted(true);
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setIsSubmitted(false);
    setAnswers({});
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pb-10">
      <div className="mt-28">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 bg-white dark:bg-slate-900/70 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">{subjectTitle}</h1>
            {hasStarted && (
              <div className="text-lg font-semibold text-pink-500">
                Time Left: {formatTime(timeLeft)}
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-slate-600 dark:text-slate-300">
              Submit anytime within 45 minutes. After timer ends, test auto-submits.
            </p>
            {!hasStarted && (
              <button
                onClick={handleStart}
                disabled={questions.length === 0}
                className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-200"
              >
                Start MCQ
              </button>
            )}
          </div>
          {questions.length === 0 && (
            <p className="text-sm text-red-500 mt-2">
              No questions found for this subject.
            </p>
          )}
        </div>
      </div>

      {hasStarted && (
        <div className="mt-8 space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 bg-white dark:bg-slate-900/70"
            >
              <h3 className="font-semibold">
                Q{index + 1}. {q.question}
              </h3>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="inline-flex items-center gap-2 border dark:border-slate-700 rounded-lg px-3 py-2"
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                      disabled={isSubmitted}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasStarted && !isSubmitted ? (
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-200"
          >
            Submit Quiz
          </button>
        </div>
      ) : hasStarted && isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 bg-white dark:bg-slate-900/70">
          <h2 className="text-xl font-bold">
            Your Score: {result.correct} / {result.total}
          </h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Review your responses and answer key below.
          </p>

          <div className="mt-4 space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-3 rounded-lg border dark:border-slate-700">
                <p className="font-medium">
                  {idx + 1}. {q.question}
                </p>
                <p className="text-sm mt-1">
                  Your answer:{" "}
                  <span className="font-semibold">
                    {answers[q.id] || "Not answered"}
                  </span>
                </p>
                <p className="text-sm">
                  Correct answer: <span className="font-semibold">{q.answer}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default McqQuiz;
