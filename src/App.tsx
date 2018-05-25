import * as React from 'react';
import ReactTable from 'react-table';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import './App.css';

const logo = require('./logo.svg');

const drawerWidth = 240;
const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const mailFolderListItems = (
  <div>
    <ListItem button={true}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

const otherMailFolderListItems = (
  <div>
    <ListItem button={true}>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);

class App extends React.Component<any, any> {

  private movies: any;
  private genres: any;
  private countries: any;
  private decades: any;
  private directors: any;
  private actors: any;
  private cinematographers: any;

  constructor(props: any) {
    super(props);
  }

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

    const { classes } = this.props;

    return (
      <div className="App">
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap={true}>
              Celluloid
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ReactTable
            data={this.movies}
            columns={columns}
            defaultSorted={[{
              id: 'watchDate',
              desc: true
            }]}
            showPageSizeOptions={false}
            filterable={true}
            noDataText={'No movies found'}
            className="-striped -highlight"
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles as any)(App);
