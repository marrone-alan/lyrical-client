import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

function RenderSongs() {
  const { loading, data, refetch } = useQuery(query);
  const [deleteSong] = useMutation(mutation);

  if (loading) return <p>Loading ...</p>;
  if (!data) return <p>Use the plus button to add a Song</p>;

  return data.songs.map(({ id, title }) => {
    return (
      <li key={id} className='collection-item'>
        <Link to={`/songs/${id}`}>{title}</Link>

        <i
          className='material-icons'
          onClick={() => handleDeleteSong(id, deleteSong, refetch)}
        >
          delete
        </i>
      </li>
    );
  });
}

function handleDeleteSong(id, deleteSong, refetch) {
  deleteSong({
    variables: { id }
  }).then(() => refetch());
}

function SongList(props) {
  return (
    <div className='container'>
      <ul className='collection'>{RenderSongs()}</ul>
      <Link to='/songs/new' className='btn-floating btn-large red right'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default SongList;
