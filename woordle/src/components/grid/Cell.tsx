// type CharStatus = "absent" | "present" | "correct";

type Props = {
  value?: string;
  status?: string;
  isRevealing?: boolean;
  isCompleted?: boolean;
  position?: number;
};
export const Cell = ({
  value,
  status,
}: Props) => {
  
  const className = "cell " + status;
  return (
    <div>
      <div className={className} id="{key}">
        {value}{" "}
      </div>
    </div>
  );
};
