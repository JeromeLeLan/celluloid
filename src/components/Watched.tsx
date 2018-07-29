import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CollectionsIcon from '@material-ui/icons/Collections';
import ViewListIcon from '@material-ui/icons/ViewList';
import { appState, ContentType } from '../AppState';
import { WatchedPostersStyled } from './WatchedPosters';
import { WatchedTable } from './WatchedTable';

interface WatchedState {
  tabValue: number;
}

export class Watched extends React.Component<{}, WatchedState> {

  constructor(props: WatchedState) {
    super(props);
    this.state = {
      tabValue: 0
    };
  }

  handleChange = (event: any, value: any) => {
    if (value === 0) {
      appState.setContent(ContentType.WatchedTable);
    } else if (value === 1) {
      appState.setContent(ContentType.WatchedPosters);
    }
    this.setState({ tabValue: value });
  }

  render() {
    let component: JSX.Element;
    if (this.state.tabValue === 0) {
      component = <WatchedTable />;
    } else { // if (this.state.tabValue === 1) {
      component = <WatchedPostersStyled />;
    }

    return (
      <>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
        >
          <Tab label="Table View" icon={<ViewListIcon />} />
          <Tab label="Grid View" icon={<CollectionsIcon />} />
        </Tabs>
        {component}
      </>
    );
  }
}
