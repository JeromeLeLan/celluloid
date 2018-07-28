import * as React from 'react';
import ReactTable from 'react-table';
import WatchedMovies from '../WatchedMovies';
import { MovieDataProvider } from '../MovieDataProvider';
const palme = require('../assets/palme.gif');

interface WatchedTableState {
  watchedMovies: WatchedMovies;
  loading: boolean;
}

export class WatchedTable extends React.Component<{}, WatchedTableState> {

  constructor(props: WatchedTableState) {
    super(props);
    this.state = {
      watchedMovies: {} as any,
      loading: true
    };
  }

  loadData() {
    return MovieDataProvider.provideWatchedData();
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
      Header: 'Rating',
      accessor: 'personalRating',
      width: 160,
      style: {
        textAlign: 'center'
      },
      Cell: row => {
        if (row.value === 6) {
          return (
            <img style={{ height: '17px' }} src={String(palme)} />);
        }
        return (<span className={`stars-container stars-${row.value}`} style={{ height: '17px' }}>★★★★★</span>);
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
      maxWidth: 80,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Runtime',
      accessor: 'runtime',
      width: 100,
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
