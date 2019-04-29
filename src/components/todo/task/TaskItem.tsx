import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../../store/boardStore';
import Task from "../../../vo/todo/task";

import '../../../style/todo/task-item.scss';

interface IProps {
  boardStore: BoardStore,
  task: Task
}

@inject('boardStore')
@observer
class BoardItem extends React.Component<IProps> {

  static defaultProps = {
    onClickTask: function () {
    }
  };

  onClickTask = () => {
    this.props.onClickTask();
  };

  render() {
    const {task} = this.props;
    return (
      <li className="task-item" onClick={this.onClickTask}>
        {task.name}
      </li>
    );
  }
}

export default BoardItem;