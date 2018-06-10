import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import MovieIcon from '@material-ui/icons/Movie';
import TimelineIcon from '@material-ui/icons/Timeline';

class AppDrawer extends React.Component<any, {}> {

  render() {
    const { classes } = this.props;

    const firstFolder = (
      <div>
        <ListItem button={true} onClick={this.openWatched}>
          <ListItemIcon>
            <LocalMoviesIcon />
          </ListItemIcon>
          <ListItemText primary="Watched" />
        </ListItem>
        <ListItem button={true} onClick={this.openCriterion}>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Criterion" />
        </ListItem>
      </div>
    );

    const secondFolder = (
      <div>
        <ListItem button={true}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
      </div>
    );

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>{firstFolder}</List>
        <Divider />
        <List>{secondFolder}</List>
      </Drawer>
    );
  }

  private openWatched(): void {
    console.log('openWatched');
  }

  private openCriterion(): void {
    console.log('openCriterion');
  }
}

const drawerWidth = 200;
const styles = (theme: any) => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

const DrawerStyled = withStyles(styles as any)(AppDrawer);
export { DrawerStyled };