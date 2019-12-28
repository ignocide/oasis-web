import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';
import Task from "../../../vo/todo/task";

import '../../../style/todo/task-item.scss';
import { Row, Col } from "../../basic/Grid";
import Input from "../../basic/Input";
import Textarea from "../../basic/Textarea";
import { ButtonGroup } from "../../basic/Form";
import Button from "../../basic/Button";

interface IProps {
  boardStore: BoardStore,
  // task: Task,
  onClickClose: Function
}

interface IState {
  taskCreateForm: ITaskCreateForm
}

@inject('boardStore')
@observer
class TaskCreateForm extends React.Component<IProps, IState> {
  state = {
    taskCreateForm: {
      name: '',
      detail: '',
    }
  };

  createTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isValidation()) {
      return;
    }

    const { taskCreateForm } = this.state;
    const { boardStore } = this.props;

    boardStore.createTask(taskCreateForm);
    this.initCrateForm();
    this.props.onClickClose();
  };

  initCrateForm = () => {
    this.setState({
      taskCreateForm: {
        name: '',
        detail: ''
      }
    });
  };

  isValidation = () => {
    const { taskCreateForm } = this.state;

    return !!taskCreateForm.name;
  };

  onChangeValue = (e) => {
    console.log('안찍힘?')
    this.setState({
      taskCreateForm: {
        ...this.state.taskCreateForm,
        [e.target.name]: e.target.value,
      }
    });
  };

  render() {
    const { onClickClose } = this.props;
    const { taskCreateForm } = this.state;
    console.log(taskCreateForm)
    return <form className='container'>
      <div className='task-form-body'>
        <Row>
          <Col size={12}>
            <h2>{'Task 생성'}</h2>
          </Col>
        </Row>
        <Row>
          <Col size={12} formGroup>
            <Input block name={'name'} label={'제목'} value={taskCreateForm.name} onChange={this.onChangeValue} />
          </Col>
        </Row>
        <Row>
          <Col size={12} formGroup>
            <Textarea name={'detail'} label={'상세내용'} value={taskCreateForm.detail} rows={7} onChange={this.onChangeValue} />
          </Col>
        </Row>
      </div>
      <div className="task-form-footer">
        <Row>
          <Col size={12}>
            {/* <ButtonGroup> */}
            <Button shape={'primary'} onClick={this.createTask}>{'생성'}</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button shape={'danger'} onClick={onClickClose}>{'취소'}</Button>
            {/* </ButtonGroup> */}
          </Col>
        </Row>
      </div>
    </form>
  }
}

export default TaskCreateForm;