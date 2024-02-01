type Props = {
  value: string;
  onClick: (value: string) => void;
  status: string;
};

export const Key = ({ value, onClick, status }: Props) => {
  const clickHandler = () => {
    onClick(value);
  };
  const className = "key " + status;
  return (
    <button onClick={clickHandler} className={className}>
      {value="ENTER"? "<-" : value}
    </button>
  );
};
