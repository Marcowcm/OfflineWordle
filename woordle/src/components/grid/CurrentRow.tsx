import { Cell } from "./Cell";

type Props = {
  solution: string;
  guess: string;
};

export const CurrentRow = ({ solution, guess }: Props) => {
  const letters = Array.from(guess.split(""));
  const empties = Array.from(Array(solution.length - guess.length));

  return (
    <div className="row flex justify-center">
      {letters.map((letter, i) => (
        <Cell value={letter} status="" key={i} />
      ))}
      {empties.map((i) => (
        <Cell  value="" status="" key={i} />
      ))}
    </div>
  );
};
