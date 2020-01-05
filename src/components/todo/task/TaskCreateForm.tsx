import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';
import Task from '../../../dto/todo/taskDto';

import '../../../style/todo/task-item.scss';

interface IProps {
  boardStore: BoardStore;
  task: Task;
}

interface IState {
  taskCreateForm: ITaskCreateForm;
}

@inject('boardStore')
@observer
class BoardItem extends React.Component<IProps, IState> {
  state = {
    taskCreateForm: {
      name: ''
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

  onChangeName = (e) => {
    const name = e.target.value;
    this.setState({
      taskCreateForm: {
        name,
        detail: ''
      }
    });
  };

  render() {
    const { task } = this.props;
    const { taskCreateForm } = this.state;
    return (
      <li className="task-item task-create-form">
        <form onSubmit={this.createTask}>
          <input type="text" className="input" name="name" placeholder="할일..." value={taskCreateForm.name} onChange={this.onChangeName} />
        </form>
      </li>
    );
  }
}

export default BoardItem;