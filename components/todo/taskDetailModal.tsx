import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../store/boardStore';
import '../../style/todo/task-detail-modal.scss';
import Task from "../../vo/todo/task";
import { FieldInput, FieldTextArea } from "../form/field";
import { Button } from "../form";

interface IProps {
  boardStore: BoardStore,
  requestClose: Function
}

interface IState {
  taskForm: Task
}

@inject('boardStore')
@observer
class TaskDetailModal extends Component<IProps> {

  static defaultProps = {
    task: {},
    requestClose: function () {
    }
  };

  state = {
    taskForm: new Task({})
  };
  initForm = () => {
    const {task} = this.props;
    const taskForm = new Task(task);
    this.setState({
      taskForm
    });
  };
  onChangeValue = (e) => {
    let {name, value} = e.target;
    let {taskForm} = this.state;
    taskForm[name] = value;
    this.setState({
      taskForm
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {taskForm} = this.state;
    const {boardStore, requestClose} = this.props;
    boardStore.updateTask(taskForm).then(() => {
      requestClose();
    });
  };
  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {taskForm} = this.state;
    const {boardStore, requestClose} = this.props;
    boardStore.deleteTask(taskForm.boardId, taskForm.id).then(() => {
      requestClose();
    });

  };

  componentDidMount() {
    this.initForm();
  }

  render() {
    const {taskForm} = this.state;

    return (
      <div className="task-detail-modal modal">
        {/* <form> */}
        {/* <form id={"task-update-form"} onSubmit={this.onSubmit}> */}
        <form>
          <div className={'modal-header'}>{'Tasl 싱세'}</div>
          <div className={'modal-body'}>
            <FieldInput name={'name'} label={'제목'} value={taskForm.name || ''} onChange={this.onChangeValue} />
            <FieldTextArea name={'detail'} label={'상세내용'} value={taskForm.detail || ''} onChange={this.onChangeValue} rows={7} />
            <FieldInput name={'updatedAt'} label={'마지막 수정'} value={taskForm.updatedAt || ''} disabled={true} />
          </div>
          <div className={'modal-footer'}>
            <Button type={"submit"} shape={'text'} onClick={this.onSubmit}> {'확인'}</Button>
            <Button shape={'text'} onClick={this.onClickDelete}>{'삭제'}</Button>
          </div>
        </form>
        {/* </form> */}
      </div>
    );
  }
}

export default TaskDetailModal;