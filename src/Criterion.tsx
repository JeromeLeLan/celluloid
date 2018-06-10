import * as React from 'react';
import ReactTable from 'react-table';
import CriterionMovies from './CriterionMovies';
import { MovieDataProvider } from './MovieDataProvider';

interface CriterionState {
  criterionMovies: CriterionMovies;
  loading: boolean;
}

export class Criterion extends React.Component<{}, CriterionState> {

  constructor(props: CriterionState) {
    super(props);
    this.state = {
      criterionMovies: {} as any,
      loading: true
    };
  }

  loadData() {
    return MovieDataProvider.provideCriterionData();
  }

  componentDidMount() {
    this.loadData()
      .then((movies) => {
        this.setState({
          criterionMovies: movies,
          loading: false
        });
      });
  }

  render() {
    const columns = [{
      id: 'spine',
      Header: 'Spine',
      accessor: 'spine',
      width: 130,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Title',
      accessor: 'title',
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
      accessor: 'year',
      maxWidth: 60,
      style: {
        textAlign: 'center'
      }
    }];

    if (this.state.loading) {
      return <div />;
    }

    return (
      <ReactTable
        data={this.state.criterionMovies.movies}
        columns={columns}
        defaultSorted={
          [{
            id: 'spine',
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
