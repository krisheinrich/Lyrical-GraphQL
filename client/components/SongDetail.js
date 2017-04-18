import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import fetchSongQuery from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song, loading } = this.props.data;
    if (loading)
      return <div></div>;
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSongQuery, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
