import { Key } from "./Key";
import { letterState } from "../gameLogics";
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void;
  onEnter: () => void;
  onDelete: () => void;
};
export const Keyboard = ({ onChar, onEnter, onDelete }: Props) => {
  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "<--") {
      onDelete();
    } else {
      onChar(value);
    }
  };
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
    return () => 
    {
      window.removeEventListener("keyup",listener)
    }
  }, [onEnter,onDelete,onChar]);
  return (
    <div className="keyboard">
      
      <div className="row">
        {"QWERTYUIOP".split("").map((letter) => (
          <Key value={letter} onClick={onClick} status={letterState(letter)} />
        ))}
      </div>
      <div className="row">
        {"ASDFGHJKL".split("").map((letter) => (
          <Key value={letter} onClick={onClick} status={letterState(letter)} />
        ))}
        <Key value="ENTER" onClick={onClick} status="default" />
      </div>
      <div className="row">
        {"ZXCVBNM".split("").map((letter) => (
          <Key value={letter} onClick={onClick} status={letterState(letter)} />
        ))}
        <Key value="<--" onClick={onClick} status="default" />
      </div>
    </div>
  );
};
