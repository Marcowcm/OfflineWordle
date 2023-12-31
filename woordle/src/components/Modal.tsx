interface Props {
  isOpen: boolean;
  info: { guesses:String[]; solution:String };
  Action: () => void;
}

export const LostModal = ({ isOpen, info, Action }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="modal container">
        {/* Content */}
        <div className="modal-content">
          <h2 className="lost-msg">You have Lost!</h2>
          <p className="lost-msg">The answer was {info.solution}</p>
          <p className="lost-msg">Try better next time.</p>
          {/* Actions */}
          <button className="modal-action" onClick={Action}>
            Start New Game
          </button>
        </div>
      </div>
    </>
  );
};

export const WinModal = ({ isOpen, info, Action }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="modal container">
        {/* Content */}
        <div className="modal-content">
          <h2>Nice Work!</h2>
          <p className="win-msg">The answer is {info.solution}</p>
          <p className="win-msg">You took {info.guesses.length} tries.</p>
          {/* Actions */}
          <button className="modal-action" onClick={Action}>
            Next Level
          </button>
        </div>
      </div>
    </>
  );
};
