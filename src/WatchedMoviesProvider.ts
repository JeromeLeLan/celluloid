import WatchedMovies from './WatchedMovies';

export class WatchedMoviesProvider {

  public static provideData = async (): Promise<WatchedMovies> => {
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
