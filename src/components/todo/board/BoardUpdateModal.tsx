import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';

import Modal, { ModalBody, ModalFooter, ModalForm, ModalHeader } from '../../basic/Modal';

import { Col, Row } from '../../basic/Grid';

import Button from '../../basic/Button';
import BoardListStore from '../../../store/boardListStore';
import Board from '../../../dto/todo/boardDto';
import Input from '~components/basic/Input';

interface IProps {
	board: Board;
	boardStore: BoardStore;
	boardListStore: BoardListStore;
	requestClose: () => void;
}

interface IState {
	form: IBoardUpdateForm;
}

@inject('boardStore', 'boardListStore')
@observer
class BoardUpdateModal extends React.Component<IProps, IState> {
	state = {
		form: {
			name: ''
		}
	};

	constructor(props) {
		super(props);
		const { boardStore } = props;
		const { board } = boardStore;
		this.state = {
			form: {
				name: board.name
			}
		}
	}

	initCrateForm = () => {
		this.setState({
			form: {
				name: '',
			}
		});
	};

	onSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { boardStore, requestClose } = this.props;
		const { form } = this.state;
		const { board } = boardStore;

		if (board.name === '') {
			return;
		}
		await boardStore.updateBoard(board.id, form)

		requestClose();
	};

	onChangeValue = (e) => {
		const { name, value } = e.target;
		const { form } = this.state;
		form[name] = value;
		this.setState({
			form
		});
	};

	render() {
		const { requestClose } = this.props;
		const { form } = this.state;
		return (
			<Modal requestClose={requestClose}>
				<ModalForm>
					<ModalHeader>{'프로젝트'}</ModalHeader>
					<ModalBody>
						<Row>
							<Col>
								<Input
									block
									name={'name'}
									label={'프로젝트명'}
									value={form.name || ''}
									onChange={this.onChangeValue}
								/>
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button shape={'solid'} type={'submit'} onClick={this.onSubmit}>
							{'수정'}
						</Button>
						<Button onClick={() => requestClose()}>
							{'취소'}
						</Button>
					</ModalFooter>
				</ModalForm>
			</Modal>
		);
	}
}

export default BoardUpdateModal;
