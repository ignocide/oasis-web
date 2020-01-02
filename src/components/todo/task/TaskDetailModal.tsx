import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardStore from '../../../store/boardStore';
import Task from '../../../dto/todo/taskDto';
import Modal, { modalController } from '../../common/Modal';

import '../../../style/todo/task-detail-modal.scss';
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from '../../basic/Modal';
import Input from '../../basic/Input';
import { Col, Row } from '../../basic/Grid';
import Textarea from '../../basic/Textarea';
import Button from '../../basic/Button';

interface IProps {
  boardStore: BoardStore;
  requestClose: Function;
}

interface IState {
  taskForm: Task;
}

@inject('boardStore')
@observer
class TaskDetailModal extends React.Component<IProps> {

  static defaultProps = {
    task: {},
    requestClose: function () {
    }
  };

  state = {
    taskForm: new Task({})
  };

  constructor(props) {
    super(props);
    modalController(this, 'deleteConfirm');
  }

  initForm = () => {
    const { task } = this.props;
    const taskForm = new Task(task);
    this.setState({
      taskForm
    });
  };

  onChangeValue = (e) => {
    const { name, value } = e.target;
    const { taskForm } = this.state;
    taskForm[name] = value;
    this.setState({
      taskForm
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { taskForm } = this.state;
    const { boardStore, requestClose } = this.props;
    await boardStore.updateTask(taskForm)
    requestClose();
  };

  deleteTask = async (e) => {
    const { taskForm } = this.state;
    const { boardStore, requestClose } = this.props;
    await boardStore.deleteTask(taskForm.boardId, taskForm.id)
    // .then(() => {
    requestClose();
    // });
  };

  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setDeleteConfirmModal(true);
  };

  componentDidMount() {
    this.initForm();
  }

  render() {
    const { taskForm, modalState } = this.state;
    const { requestClose } = this.props;
    return <>
      <Modal requestClose={requestClose}>
        <ModalForm className={'task-detail-modal'}>
          <form>
            <ModalHeader>{'Task 상세'}</ModalHeader>
            <ModalBody>
              <Row>
                <Col formGroup>
                  <Input block name={'name'} label={'제목'} value={taskForm.name || ''} onChange={this.onChangeValue} />
                </Col>
                <Col formGroup>
                  <Textarea name={'detail'} label={'상세내용'} value={taskForm.detail || ''} onChange={this.onChangeValue} rows={7} />
                </Col>
                <Col >
                  <Input block type={'datetime-local'} name={'updatedAt'} label={'마지막 수정'} value={taskForm.updatedAt || ''} disabled={true} />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} className={'primary'} shape={'solid'} onClick={this.onSubmit}> {'확인'}</Button>
              <Button shape={'danger'} className={'red'} onClick={this.onClickDelete}>{'삭제'}</Button>
              <Button shape={'text'} onClick={requestClose}>{'취소'}</Button>
            </ModalFooter>
          </form>
        </ModalForm>
      </Modal>
      {modalState.deleteConfirm && <Modal requestClose={() => this.setDeleteConfirmModal(false)}>
        <ModalForm>
          <ModalHeader>{'프로젝트 삭제'}</ModalHeader>
          <ModalBody>
            {'프로젝트를 삭제합니까?'}
          </ModalBody>
          <ModalFooter>
            <Button shape={'danger'} type={'submit'} onClick={this.deleteTask}>
              {'삭제'}
            </Button>
          </ModalFooter>
        </ModalForm>
      </Modal>}
    </>
  }
}

export default TaskDetailModal;