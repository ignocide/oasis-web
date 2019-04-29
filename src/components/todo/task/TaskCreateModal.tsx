import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';
import { FieldInput, FieldTextArea } from "../../form/Field";
import { Button } from "../../form";
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../../common/ModalForm";

import '../../../style/todo/task-detail-modal.scss';

interface IProps {
  boardStore: BoardStore,
  closeModal: () => void
}

interface IState {
  taskCreateForm: ITaskCreateForm
}

@inject('boardStore')
@observer
class TaskCreateModal extends React.Component<IProps, IState> {
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
    const { boardStore, closeModal } = this.props;

    boardStore.createTask(taskCreateForm);
    this.initCrateForm();
    closeModal();
  };

  initCrateForm = () => {
    this.setState({
      taskCreateForm: {
        name: '',
        detail: '',
      }
    });
  };

  isValidation = () => {
    const { taskCreateForm } = this.state;

    return !!taskCreateForm.name;
  };

  onChangeValue = (e) => {
    this.setState({
      taskCreateForm: {
        ...this.state.taskCreateForm,
        [e.target.name]: e.target.value,
      }
    });
  };

  render() {
    const { taskCreateForm } = this.state;
    const { closeModal } = this.props;
    return (
      <ModalForm>
        <form>
          <ModalHeader>{'할일 추가'}</ModalHeader>
          <ModalBody>
            <FieldInput name={'name'} label={'제목'} value={taskCreateForm.name || ''} onChange={this.onChangeValue} />
            <FieldTextArea name={'detail'} label={'상세내용'} value={taskCreateForm.detail || ''} onChange={this.onChangeValue} rows={7} />
          </ModalBody>
          <ModalFooter>
            <Button type={'submit'} shape={'text'} onClick={this.createTask}>{'추가'}</Button>
            <Button shape={'text'} onClick={closeModal}>{'취소'}</Button>
          </ModalFooter>
        </form>
      </ModalForm>
    );
  }
}

export default TaskCreateModal;