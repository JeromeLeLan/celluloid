import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import * as InfiniteScroll from 'react-infinite-scroller';
import * as _ from 'lodash';
import WatchedMovies from '../WatchedMovies';
import { MovieDataProvider } from '../MovieDataProvider';

interface WatchedPostersState {
  watchedMovies: WatchedMovies;
  displayedMovies: any;
  loading: boolean;
  hasMoreItems: boolean;
}

class WatchedPosters extends React.Component<any, WatchedPostersState> {

  constructor(props: WatchedPostersState) {
    super(props);
    this.loadMoreMovies = this.loadMoreMovies.bind(this);
    this.loadMoreMovies = _.throttle(this.loadMoreMovies, 500);
    this.state = {
      watchedMovies: {} as any,
      displayedMovies: [],
      loading: true,
      hasMoreItems: false
    };
  }

  loadData() {
    return MovieDataProvider.provideWatchedData();
  }

  loadMoreMovies(page: number) {
    this.setState({
      hasMoreItems: false
    });
    const moviePerPage: number = 16;
    const movies = this.state.displayedMovies;
    for (let i = (page - 1) * moviePerPage; i < (page * moviePerPage); ++i) {
      if (i >= this.state.watchedMovies.movies.length) {
        this.setState({
          displayedMovies: movies
        });
        return;
      }
      movies.push(this.state.watchedMovies.movies[i]);
    }

    this.setState({
      displayedMovies: movies,
      hasMoreItems: true
    });
  }

  componentDidMount() {
    this.loadData()
      .then((movies) => {
        movies.movies.reverse();
        this.setState({
          watchedMovies: movies,
          loading: false,
          hasMoreItems: true
        });
      });
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div />;
    }

    const items: Array<JSX.Element> = [];
    // Available size: w45, w92, w154, w185, w300, w342, w500, h632, w780, w1280, original
    this.state.displayedMovies.map(tile => {
      items.push(
        <GridListTile key={tile.imdb_id + tile.watchDate} className={classes.gridTile}>
          <a href={'https://www.imdb.com/title/' + tile.imdb_id} target="_blank">
            <img src={'https://image.tmdb.org/t/p/w185' + tile.poster_path} alt={tile.title} />
            <GridListTileBar
              title={tile.original_title}
              subtitle={<span>{tile.director}</span>}
            />
          </a>
        </GridListTile>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        hasMore={this.state.hasMoreItems}
        loadMore={this.loadMoreMovies}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <GridList cellHeight={'auto'} spacing={10} cols={8} className={classes.gridList}>
          {items}
        </GridList>
      </InfiniteScroll>
    );
  }
}

const styles = (theme: any) => ({
});

const WatchedPostersStyled = withStyles(styles as any)(WatchedPosters);
export { WatchedPostersStyled };
