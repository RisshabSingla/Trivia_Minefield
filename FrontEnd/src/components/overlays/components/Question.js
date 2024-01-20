import { useState } from "react";

export function Question({
  questions,
  setQuestions,
  index,
  question,
  choices = [],
  correct,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full col-span-3 ">
      <div className="flex justify-evenly">
        <button onClick={() => setIsOpen(!isOpen)} className="w-5/6 p-2">
          {" "}
          Question {index + 1}
        </button>
        <button
          onClick={() => {
            questions.splice(index, 1);
            setQuestions([...questions]);
          }}
          className="w-1/6"
        >
          X
        </button>
      </div>
      {isOpen ? (
        <div>
          <div className="flex justify-evenly">
            <div className="grid grid-cols-3 gap-2">
              <div>Question:</div>
              <div className="col-span-2">{question}</div>
              {choices.map((choice, index) => (
                <>
                  <div>Choice {index + 1}:</div>
                  <div className="col-span-2">{choice}</div>
                </>
              ))}
              <div> Correct Option: </div>
              <div> {correct}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
