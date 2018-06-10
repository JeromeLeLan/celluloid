import * as React from 'react';
import ReactTable from 'react-table';
import WatchedMovies from './WatchedMovies';
import { WatchedMoviesProvider } from './WatchedMoviesProvider';

interface MovieTableState {
  watchedMovies: WatchedMovies;
  loading: boolean;
}

export class MovieTable extends React.Component<{}, MovieTableState> {

  private watchedMoviesProvider: WatchedMoviesProvider;

  constructor(props: MovieTableState) {
    super(props);
    this.state = {
      watchedMovies: {} as any,
      loading: true
    };
  }

  loadData() {
    return this.watchedMoviesProvider.provideData();
  }

  componentDidMount() {
    this.loadData()
      .then((movies) => {
        this.setState({
          watchedMovies: movies,
          loading: false
        });
      });
  }

  render() {
    const columns = [{
      id: 'watchDate',
      Header: 'Seen on',
      accessor: 'watchDate',
      width: 130,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Title',
      accessor: 'original_title',
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Director',
      accessor: 'director',
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Year',
      accessor: 'release_date',
      maxWidth: 60,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Runtime',
      accessor: 'runtime',
      width: 80,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Rating',
      accessor: 'personalRating',
      width: 80,
      style: {
        textAlign: 'center'
      }
    }];

    if (this.state.loading) {
      return <div />;
    }

    return (
      <ReactTable
        data={this.state.watchedMovies.movies}
        columns={columns}
        defaultSorted={
          [{
            id: 'watchDate',
            desc: true
          }]}
        defaultPageSize={15}
        showPageSizeOptions={false}
        filterable={true}
        noDataText={'No movies found'}
        className="-striped -highlight"
      />
    );
  }
}
