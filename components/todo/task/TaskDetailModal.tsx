import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../../store/boardStore';
import Task from "../../../vo/todo/task";
import { FieldInput, FieldTextArea } from "../../form/Field";
import { Button } from "../../form";
import '../../../style/todo/task-detail-modal.scss';
import Modal, { modalController } from "../../common/Modal";

interface IProps {
  boardStore: BoardStore,
  requestClose: Function
}

interface IState {
  taskForm: Task
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
    console.log(this, this.state);
  }

  initForm = () => {
    const { task } = this.props;
    const taskForm = new Task(task);
    this.setState({
      taskForm
    });
  };

  onChangeValue = (e) => {
    let { name, value } = e.target;
    let { taskForm } = this.state;
    taskForm[name] = value;
    this.setState({
      taskForm
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { taskForm } = this.state;
    const { boardStore, requestClose } = this.props;
    boardStore.updateTask(taskForm).then(() => {
      requestClose();
    });
  };

  deleteTask = (e) => {
    const { taskForm } = this.state;
    const { boardStore, requestClose } = this.props;
    boardStore.deleteTask(taskForm.boardId, taskForm.id).then(() => {
      requestClose();
    });
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
    return (
      <div className="task-detail-modal modal">
        <form>
          <div className={'modal-header'}>{'Task 상세'}</div>
          <div className={'modal-body'}>
            <FieldInput name={'name'} label={'제목'} value={taskForm.name || ''} onChange={this.onChangeValue} />
            <FieldTextArea name={'detail'} label={'상세내용'} value={taskForm.detail || ''} onChange={this.onChangeValue} rows={7} />
            <FieldInput name={'updatedAt'} label={'마지막 수정'} value={taskForm.updatedAt || ''} disabled={true} />
          </div>
          <div className={'modal-footer'}>
            <Button type={"submit"} className={'primary'} shape={'text'} onClick={this.onSubmit}> {'확인'}</Button>
            <Button shape={'text'} className={'red'} onClick={this.onClickDelete}>{'삭제'}</Button>
            <Button shape={'text'} onClick={requestClose}>{'취소'}</Button>
          </div>
        </form>
        {modalState.deleteConfirm && <Modal requestClose={() => this.setDeleteConfirmModal(false)}>

        </Modal>}
      </div>
    );
  }
}

export default TaskDetailModal;