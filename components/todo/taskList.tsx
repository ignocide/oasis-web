import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import TaskItem from './taskItem'
import Board from "../../vo/todo/board";
import BoardStore from '../../store/boardStore'
import TaskCreateForm from './taskCreateForm';
import '../../style/todo/board-list.scss';
import Task from "../../vo/todo/task";
import Modal from '../common/modal';

interface IProps {
    boards: BoardStore
}

interface IState {
    selectedTask?: Task
}

@inject('boardStore')
@observer
class BoardList extends Component<IProps> {

    state = {
        selectedTask: null
    }

    onClickTask = (task: Task) => {
        this.setState({
            selectedTask: task
        })
    }

    closeModal = () => {
        this.setState({
            selectedTask: null
        })
    }

    render() {
        const { boardStore } = this.props;
        const { tasks, board } = boardStore;
        const { selectedTask } = this.state;
        // let boards = [new Board({ name: '보드' }), new Board({ name: '보드' })]
        if (!board) {
            return null;
        }
        return (
            <div className="board-list">
                <h2>{board.name}</h2>
                <ul>
                    <TaskCreateForm />
                    {tasks.map((task) => <TaskItem key={task.id} task={task} onClickTask={() => this.onClickTask(task)} />)}
                    {selectedTask && <Modal closeModal={this.closeModal}>{'모달'}</Modal>}
                </ul>
            </div>
        )
    }
}

export default BoardList