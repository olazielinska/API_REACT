import React, { useState } from "react";

function UpdateNote(props) {
  
  const [note, setNote] = useState({
    title: props.note.title,
    content: props.note.content
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdate(props.note.id, note);
  }

  function handleCancel() {
    props.onCancel();
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button type="submit" className="update-button">Update</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateNote;
