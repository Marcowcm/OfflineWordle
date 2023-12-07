/* eslint-disable array-callback-return */
import { getWord , getWordOnline, isValidWord } from "./words";

export const getStatus = (solution:string , guess:string) => {
  const ref = Array.from(solution.split(""));
  console.log(ref);
  const status = Array.from(guess.split(""));
  console.log(status);
  
  guess.split("").map((letter, i) => {
    if (solution[i] === letter) {
      status[i] = "correct";
      ref[i] = "-1";
      correctLetters = correctLetters.concat([String(letter)]);
    } else if (!solution.includes(letter)) {
      status[i] = "absent";
      absentLetters = absentLetters.concat([String(letter)]);
    }
    ;
  });

  guess.split("").map((letter, i) => {
    if (status[i] === "correct" || status[i] === "absent") {
    } else if (solution.includes(letter)) {
      // just in case
      if (ref.includes(letter)) {
        ref[ref.indexOf(letter)] = "-1";
        status[i] = "present";
        presentLetters = presentLetters.concat([String(letter)]);
      } else {
        status[i] = "absent";
      }
    }
  });

  return status;
};
export var presentLetters = [""];
export var absentLetters = [""];
export var correctLetters = [""];

export const letterState = (letter: string) => {
  if (correctLetters.includes(letter)) {
    return "correct";
  } else if (presentLetters.includes(letter)) {
    return "present";
  } else if (absentLetters.includes(letter)) {
    return "absent";
  } else return "";
};

export const getNewWord = (level: number) => {
  presentLetters = [""];
  absentLetters = [""];
  correctLetters = [""];
  return getWord(level); 
};

export const isValid = (level: number,word:String) => {
  return isValidWord(word.toLowerCase(),level);
};
