import { action, observable } from 'mobx';

enum ContentType {
  WatchedTable,
  WatchedPosters,
  Criterion,
  Statistics
}

class AppState {

  @observable
  contentType: ContentType = ContentType.WatchedTable;

  @action
  public setContent(contentType: ContentType) {
    this.contentType = contentType;
  }
}

export const appState = new AppState();
export { ContentType };
