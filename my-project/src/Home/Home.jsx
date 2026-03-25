import React from 'react'
import { useState } from 'react'
import Navbaar from '../component/Navbaar'
import Banner from '../component/Banner'
import Footer from '../component/Footer'
import Freebook from '../component/Freebook'
function Home() {
  const [mcqSearch, setMcqSearch] = useState("");
  const askAi = async (question) => {
    const encoded = encodeURIComponent(question);
    const response = await fetch(`https://api.duckduckgo.com/?q=${encoded}&format=json&no_html=1&skip_disambig=1`);
    const data = await response.json();

    const directAnswer = (data?.AbstractText || data?.Answer || "").trim();
    if (directAnswer) {
      return directAnswer;
    }

    return "I could not find a direct answer. Please ask a more specific question.";
  };

  return (
    <>
    <Navbaar showSearch={true} searchValue={mcqSearch} onSearchChange={setMcqSearch} />
    <Banner onAskAi={askAi} />
    <Freebook searchQuery={mcqSearch} />
    <Footer/>
   </>
  )
}

export default Home
