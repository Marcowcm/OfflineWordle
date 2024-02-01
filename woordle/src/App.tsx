import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { Grid } from "./components/grid/Grid";
import { isValid, getNewWord } from "./components/gameLogics";
import { Keyboard } from "./components/keyboard/Keyboard";
import { WinMessage, LostMessage,CompletionMessage } from "./components/Message";
import { AlertMessage } from "./components/Alert"
// import { getWord } from "./components/words";

export default function App() {
  const [level, setLevel] = useState(1);
  //const [onlineMode, setOnlineMode] = useState(false);
  const [alert,setAlert] = useState(0);
  const [solution, setSolution] = useState('LOREM');//getNewWord(level));
  const [guesses, setGuesses] = useState([] as string[]);
  const [currentGuess, setCurrentGuess] = useState("");
  
  
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  
  // const [definition,setDefinition] = useState([""]);
  const messageInfo = {
    guesses: guesses,
    solution: solution,
  };

  const onChar = useCallback((value: string) => {
    if (
      solution.length > currentGuess.length &&
      guesses.length < solution.length + 1
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  },[currentGuess,solution,guesses]
  )

  const onDelete = useCallback(() => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
    }
  }, [currentGuess]);

  const onEnter = useCallback(() => {
    
    if (isWon || isLost) {
      return;
    }
    if (currentGuess.length === solution.length) {
      // completed guess
      console.log("length okay");
      if (isValid(level, currentGuess)) {
        // Validword
        console.log("valid word");
        setGuesses(guesses.concat([currentGuess]));
        if (currentGuess === solution) {
          /* win */
          setCurrentGuess("");
          setIsWon(true);
          
          /* animation */
          //nextLevel();
        } else {
          /* WRONG, next guess */
          setCurrentGuess("");
          if (guesses.length === solution.length) {
            setIsLost(true);
          }
        }
      }else{
        console.log("not valid");
        setAlert(2); //invalid warning
      }
    }else{
      setAlert(1); // incomplete warning
    }
  }, [level,guesses,currentGuess, isLost, isWon, solution]);
  
  function newGame (){
    setLevel(1);
    setSolution(getNewWord(1));
    setGuesses([]);
    setCurrentGuess("");
    setIsWon(false);
    setIsLost(false);
  };
  
  function nextLevel(){
    setLevel(level + 1);
    setIsWon(false);
    setIsLost(false);
    setCurrentGuess(""); 
  };

  const resetAlert = useCallback(()=> {
    setAlert(0);
  },[])


  /* onKeyPress KeyId keyValue */
  useEffect(() => {setSolution(getNewWord(level));
                  setGuesses([]);
                  setCurrentGuess("");
                  }, [level])
  
  return (
    <div className="App">
      <nav className="green">
        <div className="Title">
          <span className="brand-logo center white-text">Random Word Wordle</span>
        </div>
      </nav>
      <div className="Game">
        <h4>Level {level}</h4>
      <Grid
        maxTries={solution.length + 1}
        solution={solution}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <Keyboard onChar={onChar} onEnter={onEnter} onDelete={onDelete} />

      <WinMessage isOpen={isWon && level<5 } info={messageInfo} Action={nextLevel} />
      <LostMessage isOpen={isLost} info={messageInfo} Action={newGame} />
      <AlertMessage alert={alert} action={resetAlert} />
      <CompletionMessage isOpen={isWon && level===5} info={messageInfo} Action={newGame} ></CompletionMessage>
      </div>
    </div>
  );
}
