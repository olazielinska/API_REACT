import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEditClick(){
    props.onUpdate(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleEditClick}>EDIT</button>
    </div>
  );
}

export default Note;
