import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { Grid } from "./components/grid/Grid";
import { isValid, getNewWord } from "./components/gameLogics";
import { Keyboard } from "./components/keyboard/Keyboard";
import { WinModal, LostModal,CompletionModal } from "./components/Modal";
import { AlertModal } from "./components/Alert"
// import { getWord } from "./components/words";

export default function App() {
  const [level, setLevel] = useState(1);
  //const [onlineMode, setOnlineMode] = useState(false);
  const [alert,setAlert] = useState(0);
  const [solution, setSolution] = useState('LOREM');//getNewWord(level));
  const [guesses, setGuesses] = useState([] as string[]);
  const [currentGuess, setCurrentGuess] = useState("");
  
  const [currentRowClass, setCurrentRowClass] = useState("false");
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  
  // const [definition,setDefinition] = useState([""]);
  const modalInfo = {
    guesses: guesses,
    solution: solution,
  };

  const onChar = useCallback((value: string) => {
    if (
      solution.length > currentGuess.length &&
      guesses.length < solution.length
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
      if (isValid(level, currentGuess)) {
        // Validword
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
          if (guesses.length === solution.length - 1) {
            setIsLost(true);
          }
        }
      }else{
        setAlert(2); //invalid warning
      }
    }else{
      setAlert(1); // incomplete warning
    }
  }, [level,guesses,currentGuess, isLost, isWon, solution]);


  // const getWordOnline = useCallback((level:number) => {
  //   fetch(`https://random-word-api.herokuapp.com/word?length=${level + 4}`)
  //     .then(Response => Response.json())
  //     .then(res => setSolution(res[0].toUpperCase()))
  //     .catch(err => console.log(err));
  // }, [])
  
  function newGame (){
    setLevel(1);
    setSolution(getNewWord(1));
    setGuesses([]);
    setCurrentGuess("");
    setCurrentRowClass("false");
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

  /* keyListener */
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onEnter();
      } else if (e.key === "Backspace") {
        onDelete();
      } else {
        const k = e.key.toUpperCase();
        if (k.length === 1 && k >= "A" && k <= "Z") {
          onChar(k);
        }
      }
    };
    window.addEventListener("keyup", listener);
  }, [onEnter,onDelete,onChar,currentGuess,solution]);

  /* onKeyPress KeyId keyValue */
  useEffect(() => {setSolution(getNewWord(level));
                  setGuesses([]);
                  setCurrentGuess("");
                  setCurrentRowClass("false");
                  }, [level])
  
  return (
    <div className="App">
      <h1>Wordle</h1>
      <div>
        <button onClick={newGame}>Reset</button>
        <button onClick={nextLevel}>Next Level</button>
        <p>guess:{guesses.toString()} 
        <br></br> current guess:{currentGuess}
        <br></br>
        level : {level}
        <br></br> isWon:{isWon.toString()}</p>
      </div>
      <Grid
        maxTries={solution.length}
        solution={solution}
        guesses={guesses}
        currentGuess={currentGuess}
        currentRowClassName={currentRowClass}
      />
      <Keyboard onChar={onChar} onEnter={onEnter} onDelete={onDelete} />

      <WinModal isOpen={isWon && level<5 } info={modalInfo} Action={nextLevel} />
      <LostModal isOpen={isLost} info={modalInfo} Action={newGame} />
      <AlertModal alert={alert} action={resetAlert} />
      <CompletionModal isOpen={isWon && level===5} info={modalInfo} Action={newGame} ></CompletionModal>
    </div>
  );
}
