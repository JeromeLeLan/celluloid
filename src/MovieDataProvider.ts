import CriterionMovies from './CriterionMovies';
import WatchedMovies from './WatchedMovies';

export class MovieDataProvider {

  public static provideCriterionData = async (): Promise<CriterionMovies> => {
    return fetch('criterionInfos.json')
      .then(res => res.json())
      .then(
        (result) => {
          return Promise.resolve(result);
        },
        (error) => {
          console.log('error = ', error);
        }
      );
  }

  public static provideWatchedData = async (): Promise<WatchedMovies> => {
    return fetch('watched.json')
      .then(res => res.json())
      .then(
        (result) => {
          return Promise.resolve(result);
        },
        (error) => {
          console.log('error = ', error);
        }
      );
  }
}
