interface Props {
  alert: number,
  action: ()=>void ,
}
const alertContent = ["Word is incomplete.",
                        "Word is Invalid",
                        "Lorem Ipsum"]


export const AlertMessage = ({ alert,action }: Props) => {
  if (alert === 0)  {
    return null
  }
  else{
    return(
        <>
      <div className="message container">
        {/* Content */}
        <div className="message-content alert">
          <h2>{alertContent[alert-1]}</h2>
          {/* Actions */}
          <button className="message-action" onClick={action}>
            Close
          </button>
        </div>
      </div>
    </>
      )
  }
  };

