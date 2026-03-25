import React, { useState } from 'react'
import banner from "../../public/banner.jpg"

const Banner = ({ onAskAi = () => {} }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const submitQuestion = async () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    try {
      setIsLoading(true);
      const aiAnswer = await onAskAi(trimmed);
      setAnswer(aiAnswer || "No answer returned.");
      setShowAnswer(true);
    } catch (error) {
      setAnswer("Unable to get AI answer right now.");
      setShowAnswer(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center py-10'>
      
      {/* Text Section */}
      <div className='w-full md:w-1/2 mt-12 md:mt-32 order-2 md:order-1'>
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold'>
            HELLO, WELCOME HERE TO LEARN SOMETHING{" "}
            <span className='text-pink-500'>new everyday</span>
          </h1>

          <p className='text-xl'>
           ANY PROBLEM ASK AI
          </p>

          <label className="input w-full flex items-center gap-2">
           <input
  type="text"
  className="grow bg-white dark:bg-slate-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
  placeholder="Ask AI anything..."
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitQuestion();
    }
  }}
/>
          </label>

          <button className="btn btn-secondary" onClick={submitQuestion} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Enter"}
          </button>

          {showAnswer && answer && (
           <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4">
  <div className="flex items-start justify-between gap-3 mb-1">
    <p className="text-sm font-semibold text-pink-500">AI Answer</p>
    <button
      type="button"
      onClick={() => setShowAnswer(false)}
      className="text-xs px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
    >
      Close
    </button>
  </div>

  <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
    {answer}
  </p>
</div>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full md:w-1/2 flex justify-center order-1'>
        <img
          src={banner}
          alt="Banner"
          className="w-full max-w-lg h-auto object-contain"
        />
      </div>

    </div>
  )
}

export default Banner
