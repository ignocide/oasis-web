import React from 'react';
import withStore from './withStore';
import AuthStore from '../../store/common/authStore';
import { inject } from 'mobx-react';
import { setToken } from '../../api';

interface IProps {
	withAuthProps: {
		user?: any;
		token?: string;
	};
	authStore: AuthStore;
}

function withAuth(WrappedComponent: any) {
	// ...and returns another component...
	@inject('authStore')
	class _withAuth extends React.Component<IProps, any> {
		constructor(props) {
			super(props);
			const { authStore, withAuthProps } = props;
			const { user, token } = withAuthProps;
			if (user) {
				authStore.setUser(user);
				authStore.setToken(token);
				setToken(token);
			}
		}

		static async getInitialProps(ctx) {
			// const { user } = ctx.req.session
			const { req } = ctx;

			let user = null;
			let token = null;
			if (req && req.session) {
				user = req.session.user;
				token = req.session.token;
				setToken(token);
			}
			const appProps = WrappedComponent.getInitialProps(ctx);
			return {
				...appProps,
				withAuthProps: {
					user,
					token
				}
			};
		}

		render() {
			// ... and renders the wrapped component with the fresh data!
			// Notice that we pass through any additional props
			return <WrappedComponent {...this.props} />;
		}
	}

	return withStore(AuthStore)(_withAuth);
}

export default withAuth;
