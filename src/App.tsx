import * as React from 'react';
import { MovieTable } from './MovieTable';
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

const drawerWidth = 200;
const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: 750,
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
      <ListItemText primary="Watched" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Criterion" />
    </ListItem>
  </div>
);

const otherMailFolderListItems = (
  <div>
    <ListItem button={true}>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
  </div>
);

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <div className={classes.root}>
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
            <MovieTable />
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles as any)(App);
