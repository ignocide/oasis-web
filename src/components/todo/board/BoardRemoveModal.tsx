import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';

import Modal, { ModalBody, ModalFooter, ModalForm, ModalHeader } from '../../basic/Modal';

import { Col, Row } from '../../basic/Grid';

import Button from '../../basic/Button';
import BoardListStore from '../../../store/boardListStore';
import Board from '../../../dto/todo/boardDto';

interface IProps {
	board: Board;
	boardStore: BoardStore;
	boardListStore: BoardListStore;
	requestClose: () => void;
}

interface IState {
	boardCreateForm: ITaskCreateForm;
	modalOpen: boolean;
}

@inject('boardStore', 'boardListStore')
@observer
class BoardRemoveModal extends React.Component<IProps, IState> {
	state = {
		boardCreateForm: {
			name: ''
		},
		modalOpen: false
	};

	constructor(props) {
		super(props);
	}

	initCrateForm = () => {
		this.setState({
			boardCreateForm: {
				name: '',
				detail: ''
			}
		});
	};

	onSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { boardListStore, boardStore, board, requestClose } = this.props;

		boardStore.clearBoard();
		await boardListStore.removeBoard(board.id)

		requestClose();
	};

	onChangeValue = (e) => {
		const { name, value } = e.target;
		const { boardCreateForm } = this.state;
		boardCreateForm[name] = value;
		this.setState({
			boardCreateForm
		});
	};

	render() {
		const { requestClose } = this.props
		return (
			<Modal requestClose={requestClose}>
				<ModalForm>
					<ModalHeader>{'프로젝트 삭제'}</ModalHeader>
					<ModalBody>
						<Row>
							<Col>
								{'삭제하시겠습니까?'}
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button shape={'solid'} type={'submit'} onClick={this.onSubmit}>
							{'삭제'}
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

export default BoardRemoveModal;
