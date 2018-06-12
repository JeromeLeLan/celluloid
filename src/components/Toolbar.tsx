import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class AppToolbar extends React.Component<any, {}> {

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap={true}>
            Celluloid
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme: any) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed'
  }
});

const ToolbarStyled = withStyles(styles as any)(AppToolbar);
export { ToolbarStyled };
