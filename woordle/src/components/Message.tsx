interface Props {
  isOpen: boolean;
  info: { guesses:String[]; solution:String };
  Action: () => void;
}

export const LostMessage = ({ isOpen, info, Action }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="message container">
        {/* Content */}
        <div className="message-content">
          <h2 className="lost-msg">You have Lost!</h2>
          <p className="lost-msg">The answer was {info.solution}</p>
          <p className="lost-msg">Try better next time.</p>
          {/* Actions */}
          <button className="message-action" onClick={Action}>
            Start New Game
          </button>
        </div>
      </div>
    </>
  );
};

export const WinMessage = ({ isOpen, info, Action }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="message section">
        {/* Content */}
        <div className="message-content">
          <h2>Nice Work!</h2>
          <p className="win-msg">The answer is {info.solution}</p>
          <p className="win-msg">You took {info.guesses.length} tries.</p>
          {/* Actions */}
          <button className="message-action" onClick={Action}>
            Next Level
          </button>
        </div>
      </div>
    </>
  );
};

export const CompletionMessage = ({ isOpen, info, Action }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="message container">
        {/* Content */}
        <div className="message-content">
          <h2>Most Impressive!</h2>
          <p className="win-msg">The answer is {info.solution}</p>
          <p className="win-msg">You took {info.guesses.length} tries.</p>
          <p className="win-msg">You have finished all the levels.</p>
          {/* Actions */}
          <button className="message-action" onClick={Action}>
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

