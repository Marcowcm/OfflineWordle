// type CharStatus = "absent" | "present" | "correct";

type Props = {
  value?: string;
  status?: string;
  key:number;
};
export const Cell = ({
  value,
  status,
  key,
}: Props) => {
  
  const className = "cell col " + status;
  return (
    
      <div className={className} id={String(key)}>
        {value}{" "}
      </div>
    
  );
};
