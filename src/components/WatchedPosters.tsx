import * as React from 'react';
import ReactTable from 'react-table';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import WatchedMovies from '../WatchedMovies';
import { MovieDataProvider } from '../MovieDataProvider';

interface WatchedPostersState {
  watchedMovies: WatchedMovies;
  loading: boolean;
}

class WatchedPosters extends React.Component<any, WatchedPostersState> {

  constructor(props: WatchedPostersState) {
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
        movies.movies.reverse();
        this.setState({
          watchedMovies: movies,
          loading: false
        });
      });
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div />;
    }

    return (
      <GridList cellHeight={180} cols={8} className={classes.gridList}>
        {this.state.watchedMovies.movies.map(tile => (
          <GridListTile key={tile.imdb_id + tile.watchDate}>
            <img src={tile.poster_path} alt={tile.title} />
            <GridListTileBar
              title={tile.original_title}
              subtitle={<span>{tile.director}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

const styles = (theme: any) => ({
  gridList: {
    // height: 550,
  }
});

const WatchedPostersStyled = withStyles(styles as any)(WatchedPosters);
export { WatchedPostersStyled };
