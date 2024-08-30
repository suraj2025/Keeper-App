import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import SaveIcon from '@mui/icons-material/Save';

const initialState = {
  title: "",
  content: ""
}

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if (props.edit) {
      props.update(note);
    } else {
      props.onAdd(note);
    }
    setNote(initialState);

    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  useEffect(() => {
    if (props.edit) {
      setNote(props.edit)
    }
  }, [props.edit])

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            {props.edit ? <SaveIcon /> : <AddIcon />}
          </Fab>
        </Zoom>
      </form>
    </div>

  );
}

export default CreateArea;
