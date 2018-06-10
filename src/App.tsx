import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DrawerStyled } from './Drawer';
import { MovieTable } from './MovieTable';
import { ToolbarStyled } from './Toolbar';

class App extends React.Component<any, {}> {

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <div className={classes.root}>
          <ToolbarStyled />
          <DrawerStyled />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <MovieTable />
          </main>
        </div>
      </div>
    );
  }
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: 750,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

export default withStyles(styles as any)(App);
