import * as React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { appState, ContentType } from '../AppState';
import { CriterionStyled } from './Criterion';
import { DrawerStyled } from './Drawer';
import { ToolbarStyled } from './Toolbar';
import { Watched } from './Watched';
import { StatisticsStyled } from './Statistics';

@observer
class App extends React.Component<any, {}> {

  render() {
    const { classes } = this.props;

    let mainComponent: JSX.Element;
    if (ContentType.WatchedTable === appState.contentType) {
      mainComponent = <Watched />;
    } else if (ContentType.Criterion === appState.contentType) {
      mainComponent = <CriterionStyled />;
    } else if (ContentType.Statistics === appState.contentType) {
      mainComponent = <StatisticsStyled />;
    } else {
      mainComponent = <Watched />;
    }

    return (
      <div className="App">
        <div className={classes.root}>
          <ToolbarStyled />
          <DrawerStyled />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {mainComponent}
          </main>
        </div>
      </div>
    );
  }
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingLeft: 220,
    paddingRight: 20,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

export default withStyles(styles as any)(App);
