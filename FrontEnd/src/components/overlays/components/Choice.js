function Choice({ choice, choices, setChoices, index }) {
  return (
    <div className="w-full flex col-span-3">
      <div className="w-full grid grid-cols-4">
        <span className="p-2 pr-0">Choice {index + 1}:</span>
        <div className="flex col-span-2">
          <div className="truncate p-2">{choice}</div>
        </div>
        <button
          className="pl-3 p-2"
          onClick={() => {
            choices.splice(index, 1);
            setChoices([...choices]);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Choice;
