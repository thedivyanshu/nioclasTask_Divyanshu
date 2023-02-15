import React, { useEffect, useState } from "react";
import { MdOutlineArrowForward, MdOutlineArrowBack } from "react-icons/md";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import axios from "axios";

const Homepage = () => {
  const [myData, setMyData] = useState([]);
  const [questionId, setQuestionId] = useState([]);
  const [qNumber, setQNumber] = useState(1);
  const loadQuestion = () => {
    axios
      .get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_${qNumber}`
      )
      .then((res) => {
        setMyData(res.data[0].Question);
        console.log(res.data[0]);
        setQuestionId(res.data[0].QuestionID);
      });
  };
  useEffect(() => {
    loadQuestion();
  });

  return (
    <div className="question">
      <h1>{questionId}</h1>
      <MathJaxContext>
        <MathJax>{myData}</MathJax>
      </MathJaxContext>
      <button onClick={() => setQNumber(qNumber - 1)}>
        <MdOutlineArrowBack />
      </button>
      <button onClick={() => setQNumber(qNumber < 5 && qNumber + 1)}>
        <MdOutlineArrowForward />
      </button>
    </div>
  );
};

export default Homepage;
