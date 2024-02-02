// type CharStatus = "absent" | "present" | "correct";

type Props = {
  value?: string;
  status?: string;
};
export const Cell = ({
  value,
  status,
}: Props) => {
  
  const className = "cell col " + status;
  return (
    
      <div className={className}>
        {value}{" "}
      </div>
    
  );
};
