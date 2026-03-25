import React from "react";
import { useEffect, useState } from "react";
import Navbaar from "../component/Navbaar";
import Footer from "../component/Footer";
import McqQuiz from "../component/McqQuiz";
import { useParams } from "react-router-dom";
import { getMcqSubjectById } from "../data/mcqData";

function McqPage() {
  const { subjectId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    setSelectedSubject(getMcqSubjectById(subjectId));
  }, [subjectId]);

  return (
    <>
      <Navbaar />
      <McqQuiz
        subjectTitle={selectedSubject?.title || "MCQ Practice Quiz"}
        questions={selectedSubject?.questions || []}
      />
      <Footer />
    </>
  );
}

export default McqPage;
