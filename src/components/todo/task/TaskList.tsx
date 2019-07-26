import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../../store/boardStore';
import Task, { STEP } from "../../../vo/todo/task";
import Modal from '../../common/Modal';
import TaskDetailModal from "./TaskDetailModal";
import { IconButton } from "../../form";
import TaskCreateModal from "./TaskCreateModal";

import '../../../style/todo/board-list.scss';
import { Card, CardBody, CardHeader } from "../../basic/Card";
import { Table } from "../../basic/Table";

interface IProps {
  boardStore: BoardStore
}

interface IState {
  selectedTask?: Task
}

@inject('boardStore')
@observer
class TaskList extends React.Component<IProps, IState> {

  state = {
    selectedTask: null,
    taskCreateModal: false
  };

  onClickTask = (task: Task) => {
    this.setState({
      selectedTask: task
    });
  };

  onChangeTaskState = (e, task) => {
    const isChecked = e.target.checked;
    const { boardStore } = this.props;
    boardStore.updateTaskStep(task, {
      step: isChecked ? STEP.DONE : STEP.TODO
    });

  };
  format = [
    {
      label: ' ',
      width: 60,
      render: (task) => {
        return <TaskCheckBox onChange={(e) => this.onChangeTaskState(e, task)} checked={task.step !== 'TODO'} />;
      }
    },
    {
      label: '내용',
      render: 'name',
    },
    {
      label: ' ',
      width: 60,
      render: (task: Task) => (
        <IconButton onClick={() => this.onClickTask(task)} name={'create'} hoverText={'수정하기'}> </IconButton>)
    }
  ];
  closeModal: void = () => {
    this.setState({
      selectedTask: null,
      taskCreateModal: false
    });
  };
  onClickOpenCreateFormButton = () => {
    this.setState({
      selectedTask: null,
      taskCreateModal: true
    });
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { boardStore } = this.props;
    const { tasks, board } = boardStore;
    const { taskCreateModal, selectedTask } = this.state;
    if (!board) {
      return null;
    }
    return (
      <>
      <Card>
        <CardHeader>{board.name}
          <IconButton onClick={this.onClickOpenCreateFormButton} name={'add'}> </IconButton>
        </CardHeader>
        <CardBody>
        </CardBody>
        <Table
          format={this.format}
          data={tasks}
        />
        {/* {JSON.stringify(tasks)} */}
      </Card>

      <div>
        {selectedTask && <Modal requestClose={this.closeModal}>
          <TaskDetailModal task={selectedTask} requestClose={this.closeModal} />
        </Modal>}
        {
          taskCreateModal && <Modal requestClose={this.closeModal}>
            <TaskCreateModal closeModal={this.closeModal} />
          </Modal>
        }
      </div>
      </>
    );
  }
}


const TaskCheckBox = ({ ...props }) => {
  return (
    <label className="task-checkbox">
      <input className="task-checkbox-input" type="checkbox" {...props} />

      <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" className="task-checkbox-icon" viewBox="0 0 25 25">
        {/* <path className="todo__box" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path> */}
        <path className="task-checkbox-box" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4" />
        <path className="task-checkbox-check" d="M10 13 l 2 2 l 5 -5" />
        <circle className="task-checkbox-circle" cx="13.5" cy="12.5" r="10" />
      </svg>
      {/* <div class="todo__text">Not so important task</div> */}
    </label>
  );
};

export default TaskList;