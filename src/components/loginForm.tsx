import React from 'react';
import * as authApi from '../api/auth/index';
import { COOKIE_KEYS, default as cookieUtil } from '../lib/cookies';
import { setToken } from '../api';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';

import '../style/login-form.scss';
import { Card, CardBody, CardFooter, CardHeader } from './basic/Card';
import Button from './basic/Button';
import { Col, Row } from './basic/Grid';
import { FormLabel } from './basic/Form';
import Input from './basic/Input';
import AuthStore from '../store/common/authStore';

interface IProps {
	authStore: AuthStore;
}

interface IState {
	loginForm: {
		username: string;
		password: string;
	};
}

@inject('authStore', 'appStore')
@observer
class LoginForm extends React.Component<IProps, IState> {
	state = {
		loginForm: {
			username: '',
			password: ''
		}
	};

	requestLogin = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		const { loginForm } = this.state;
		const { authStore } = this.props;
		const { access_token, refresh_token } = await authApi.login({
			username: loginForm.username,
			password: loginForm.password
		});

		const decodedToken = await authApi.checkToken({ token: access_token });

		authStore.setUser({
			username: decodedToken.user_name,
			authorities: decodedToken.authorities,
			id: decodedToken.id
		});

		setToken(access_token);
		cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
		cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);

		Router.push({
			pathname: '/'
		});
	};

	validate = (e) => {
		const { username, password } = this.state.loginForm;
		if (!username || !password) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	onChangeLoginFormValue = (e) => {
		this.setState({
			loginForm: {
				...this.state.loginForm,
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		const { username, password } = this.state.loginForm;

		return (
			<Card className={'login-form-card'}>
				<form id="Login" onSubmit={this.requestLogin}>
					<CardHeader>{'로그인'}</CardHeader>
					<CardBody>
						<Row>
							<Col formGroup>
								<FormLabel>{'Email'}</FormLabel>
								<Input
									block
									value={username}
									type={'text'}
									onChange={this.onChangeLoginFormValue}
									name={'username'}
								/>
							</Col>
							<Col formGroup>
								<FormLabel>{'password'}</FormLabel>
								<Input
									block
									value={password}
									type={'password'}
									onChange={this.onChangeLoginFormValue}
									name={'password'}
								/>
							</Col>
						</Row>
					</CardBody>
					<CardFooter>
						<Button shape={'solid'} onClick={this.validate}>
							{'로그인'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		);
	}
}

export default LoginForm;
