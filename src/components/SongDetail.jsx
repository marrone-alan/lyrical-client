import React, { useState, useEffect } from "react";
import query from "../queries/fetchSong";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

function SongDetail(props) {
  const { loading, data, refetch } = useQuery(query, {
    variables: { id: props.match.params.id }
  });

  if (loading) return <div>Loading ...</div>;
  if (!data) return <p>There is no data to this Song</p>;

  return (
    <div className="container">
      <Link to="/">Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate songId={props.match.params.id} history={props.history} />
    </div>
  );
}

export default SongDetail;
