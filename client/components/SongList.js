import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongList'
import deleteSongMutation from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } });
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item song">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons right" onClick={() => this.onSongDelete(id)}>delete</i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading)
      return <div></div>;
    return (
      <div>
        <ul className="collection">
          { this.renderSongs() }
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSongMutation)(
  graphql(fetchSongsQuery)(SongList)
);
