type Props = {
  value: string;
  onClick: (value: string) => void;
  status: string;
};

export const Key = ({ value, onClick, status }: Props) => {
  const clickHandler = () => {
    onClick(value);
  };
  const className = "key col center-align " + status;
  return (
    <button key={value} onClick={clickHandler} className={className} value = {value}>
      {value==="ENTER"? <i className="material-icons">keyboard_return</i> :value==="<--"? <i className="material-icons">undo</i> : value}
    </button>
  );
};
