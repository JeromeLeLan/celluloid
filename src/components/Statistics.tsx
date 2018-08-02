import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WatchedMovies from '../WatchedMovies';
import { MovieDataProvider } from '../MovieDataProvider';
import { RadialChart, Hint } from 'react-vis';

interface GenreChartState {
  watchedMovies: WatchedMovies;
  loading: boolean;
  hintValue: any;
}

class Statistics extends React.Component<any, GenreChartState> {

  constructor(props: any) {
    super(props);
    this.state = {
      watchedMovies: {} as any,
      loading: true,
      hintValue: {} as any
    };
    this.onMouseOver = this.onMouseOver.bind(this);
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
    const { classes } = this.props;

    if (this.state.loading) {
      return <div />;
    }

    const data: any = [];

    for (let key in this.state.watchedMovies.genres) {
      if (this.state.watchedMovies.genres.hasOwnProperty(key)) {
        data.push({ label: key, count: this.state.watchedMovies.genres[key] });
      }
    }

    return (
      <RadialChart
        className={'donut-chart-example'}
        innerRadius={100}
        radius={140}
        getAngle={d => d.count}
        data={data}
        onValueMouseOver={this.onMouseOver}
        onSeriesMouseOut={v => this.setState({ hintValue: false })}
        width={300}
        height={300}
      >
        {this.state.hintValue && <Hint
          value={this.state.hintValue}
          style={
            {
              content: {
                color: 'white'
              }
            }
          }
        />}
      </RadialChart>
    );
  }

  private onMouseOver(v: any): void {
    const hint = { Count: v.count, Genre: v.label, x: v.x, y: v.y };
    this.setState({ hintValue: hint });
  }
}

const styles = (theme: any) => ({
});

const StatisticsStyled = withStyles(styles as any)(Statistics);
export { StatisticsStyled };
