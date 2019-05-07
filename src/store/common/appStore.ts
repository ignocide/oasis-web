import { action, observable } from 'mobx';


class AppStore {
  @observable sidebar: boolean = false;

  constructor(isServer: boolean, initialData: any) {
    Object.assign(this, initialData);
  }

  @action
  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }

}

export default AppStore;