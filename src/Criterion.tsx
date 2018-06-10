import * as React from 'react';
import ReactTable from 'react-table';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Checkbox from '@material-ui/core/Checkbox';
import CriterionMovies from './CriterionMovies';
import { MovieDataProvider } from './MovieDataProvider';

interface CriterionState {
  criterionMovies: CriterionMovies;
  loading: boolean;
}

class Criterion extends React.Component<any, CriterionState> {

  constructor(props: any) {
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
    const { classes } = this.props;

    const columns = [{
      id: 'spine',
      Header: 'Spine',
      accessor: 'spine',
      width: 130,
      style: {
        textAlign: 'center'
      }
    }, {
      Header: 'Watched',
      accessor: 'watched',
      width: 100,
      Cell: (row: any) => (
        <Checkbox
          className={classes.size}
          disableRipple={true}
          checked={row.value}
          value="checkedA"
        />
      ),
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

const styles = (theme: any) => ({
  size: {
    width: 15,
    height: 15,
  }
});

const CriterionStyled = withStyles(styles as any)(Criterion);
export { CriterionStyled };
