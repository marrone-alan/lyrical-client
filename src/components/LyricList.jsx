import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

function RenderLyrics(lyrics) {
  const [likeLyric, { data }] = useMutation(mutation);

  function onLike(id, likes) {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "Lyric",
          likes: likes + 1
        }
      }
    });
  }

  return lyrics.map(({ id, content, likes }) => {
    return (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    );
  });
}

function LyricList(props) {
  return <ul className="collection">{RenderLyrics(props.lyrics)}</ul>;
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default LyricList;
