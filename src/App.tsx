import * as React from 'react';
import ReactTable from 'react-table';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  
  private movies: any;
  private genres: any;
  private countries: any;
  private decades: any;
  private directors: any;
  private actors: any;
  private cinematographers: any;

  componentWillMount() {
    fetch('watched.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.movies = result.movies;
          this.genres = result.genres;
          this.countries = result.countries;
          this.decades = result.decades;
          this.directors = result.directors;
          this.actors = result.actors;
          this.cinematographers = result.cinematographers;
          this.setState({
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const columns = [{
      id: 'watchDate',
      Header: 'Seen on',
      accessor: 'watchDate'
    }, {
      Header: 'Title',
      accessor: 'original_title'
    }, {
      Header: 'Director',
      accessor: 'director'
    }, {
      Header: 'Year',
      accessor: 'release_date'
    }, {
      Header: 'Runtime',
      accessor: 'runtime'
    }, {
      Header: 'Rating',
      accessor: 'personalRating'
    }];
  
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Celluloid</h1>
        </header>
        
        <ReactTable
          data={this.movies}
          columns={columns}
          sorted={[{
            id: 'watchDate',
            desc: true
          }]}
        />
      </div>
    );
  }
}

export default App;
