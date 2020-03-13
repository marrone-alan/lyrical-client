import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import query from '../queries/fetchSong';

function LyricCreate(props) {
  const [input, setInput] = useState({});
  const [addLyricsToSong, { data }] = useMutation(mutation);

  const handleInputChange = e =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });

  const onSubmit = event => {
    event.preventDefault();

    addLyricsToSong({
      variables: { content: input.lyric, id: props.songId },
      refetchQueries: [{ query, variables: { id: props.songId } }]
    }).then(() => {
      setInput({ ...input, lyric: '' });
    });
  };

  return (
    <form onSubmit={onSubmit.bind(this)}>
      <label htmlFor='lyric'>Add a Lyric</label>
      <input
        type='text'
        name='lyric'
        onChange={handleInputChange}
        value={input.lyric}
      />
    </form>
  );
}

const mutation = gql`
  mutation AddLyricsToSong($content: String, $id: ID!) {
    addLyricsToSong(content: $content, id: $id) {
      id
      content
    }
  }
`;

export default LyricCreate;
