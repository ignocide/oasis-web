import { action, observable } from 'mobx';

interface IUser {
  username: string,
  authorities: string[],
  id: number
}

class Auth {
  @observable user: IUser = null;

  constructor(isServer: boolean, initialData: any) {
    if(isServer){

    }
    this.user = initialData.user;
  }

  @action
  setUser = (user: IUser) => {
    this.user = user;
  };

  @action
  logout = () => {
    this.user = null;
  }
}

export default Auth;