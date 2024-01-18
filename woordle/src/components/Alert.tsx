interface Props {
  alert: number,
  action: ()=>void ,
}
const alertContent = ["Word is incomplete.",
                        "Word is Invalid",
                        "Lorem Ipsum"]


export const AlertModal = ({ alert,action }: Props) => {
  if (alert === 0)  {
    return null
  }
  else{
    return(
        <>
      <div className="modal container">
        {/* Content */}
        <div className="modal-content alert">
          <h2>{alertContent[alert-1]}</h2>
          {/* Actions */}
          <button className="modal-action" onClick={action}>
            Close
          </button>
        </div>
      </div>
    </>
      )
  }
  };

