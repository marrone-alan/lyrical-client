import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import query from "../queries/fetchSongs";

function SongCreate(props) {
  const [input, setInput] = useState({});
  const [addSong, { data }] = useMutation(mutation);

  const handleInputChange = e =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });

  const onSubmit = event => {
    event.preventDefault();
    addSong({
      variables: { title: input.title },
      refetchQueries: [{ query }]
    }).then(() => {
      props.history.push("/");
    });
  };

  return (
    <div className="container">
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit.bind(this)}>
        <label htmlFor="title">Song Title</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={input.title}
        />
      </form>
    </div>
  );
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default SongCreate;
