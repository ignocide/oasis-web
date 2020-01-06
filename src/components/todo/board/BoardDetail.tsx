import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardListStore from '../../../store/boardListStore';
import BoardStore from '../../../store/boardStore';

import { IconButton } from '../../../components/form';
import Icon from '../../../components/basic/Icon';
import BoardRemoveModal from './BoardRemoveModal';
import { Table } from '../../../components/basic/Table';
import Task, { STEP } from '../../../dto/todo/taskDto';
import TaskDetailModal from '../task/TaskDetailModal';
import TaskCreateModal from '../task/TaskCreateModal';
import { modalController } from '../../../components/basic/Modal';
import Button from '../../../components/basic/Button';

import '../../../style/todo/board-detail.scss';
import BoardUpdateModal from './BoardUpdateModal';

interface IProps {
  boardListStore: BoardListStore;
  boardStore: BoardStore;
}

interface IState {
}


@inject('boardStore', 'boardListStore')
@observer
class BoardDetail extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);

    modalController(this, 'createTask');
    modalController(this, 'removeBoardConfirm');
    modalController(this, 'updateBoard');


  }

  onClickBoard = (board) => {
    const { boardStore } = this.props;
    boardStore.fetchBoard(board.id);
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
      width: '82px',
      render: (task) => {
        return <TaskCheckBox onChange={(e) => this.onChangeTaskState(e, task)} checked={task.step !== 'TODO'} />;
      }
    },
    {
      label: '이름',
      render: 'name',
    },
    {
      label: <Icon className={'add-task-btn'} size={'xs'} onClick={() => this.setCreateTaskModal(true)} name={'add_box'} hoverText={'추가하기'} />,
      width: '60px',
      render: (task: Task) => (
        <div className={'task-func'}>
          <Icon size={'xs'} onClick={() => this.onClickTask(task)} name={'create'} />
        </div>
      )
    }
  ];

  closeModal = () => {
    this.setState({
      selectedTask: null,
    });
  };

  render() {
    const { boardStore } = this.props;
    const { board, tasks } = boardStore;
    const { selectedTask } = this.state;
    const { modalState } = this.state;
    if (!board) {
      return null;
    }
    return (
      <div className="board-detail">
        <h1 className={'board-name'}>{board.name}<span className={'board-edit-funcs'}>
          <Icon name={'edit'} onClick={() => this.setUpdateBoardModal(true)} />
          <Icon name={'delete'} onClick={() => this.setRemoveBoardConfirmModal(true)} /></span></h1>

        <Table
          className={'task-list-table'}
          format={this.format}
          data={tasks}
        />
        {selectedTask ? <TaskDetailModal task={selectedTask} requestClose={this.closeModal} /> : null}
        {modalState.createTask ? <TaskCreateModal closeModal={() => this.setCreateTaskModal(false)} /> : null}
        {modalState.removeBoardConfirm ? <BoardRemoveModal requestClose={() => this.setRemoveBoardConfirmModal(false)} board={board} /> : null}
        {modalState.updateBoard ? <BoardUpdateModal requestClose={() => this.setUpdateBoardModal(false)} /> : null}
      </div>
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


export default BoardDetail;