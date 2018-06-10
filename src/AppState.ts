import { action, observable } from 'mobx';

enum ContentType {
  Watched,
  Criterion,
  Statistics
}

class AppState {

  @observable
  contentType: ContentType = ContentType.Watched;

  @action
  public setContent(contentType: ContentType) {
    this.contentType = contentType;
  }
}

export const appState = new AppState();
export { ContentType };
