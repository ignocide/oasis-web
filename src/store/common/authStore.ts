import { action, observable } from 'mobx';
import * as authApi from '../../api/auth';
import cookieUtil, { COOKIE_KEYS } from '../../lib/cookies';
import { setToken } from '../../api';

interface IUser {
	username: string;
	authorities: string[];
	id: number;
}

class AuthStore {
	@observable user: IUser = null;

	constructor(isServer: boolean, initialData: any) {
		if (isServer) {
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
	};


	@action
	login = async (loginForm: authApi.ILoginForm) => {
		const { access_token, refresh_token } = await authApi.login(loginForm)


		const decodedToken = await authApi.checkToken({ token: access_token });

		this.setUser({
			username: decodedToken.user_name,
			authorities: decodedToken.authorities,
			id: decodedToken.id
		});

		cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
		cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
		setToken(access_token)
	}
}

export default AuthStore;
