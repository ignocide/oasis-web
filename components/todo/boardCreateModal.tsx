import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../store/boardStore';
import { ButtonGroup, FieldInput } from "../form/field";
import { Button } from "../form";

import '../../style/todo/board-item.scss';

interface IProps {
  boardStore: BoardStore,
  requestClose: () => void
}

interface IState {
  boardCreateForm: ITaskCreateForm
}

@inject('boardStore')
@observer
class BoardItem extends React.Component<IProps, IState> {
  state = {
    boardCreateForm: {
      name: ''
    }
  };

  constructor(props) {
    super(props);
  }

  initCrateForm = () => {
    this.setState({
      boardCreateForm: {
        name: ''
      }
    });
  };

  isValidation = () => {
    const {boardCreateForm} = this.state;

    return !!boardCreateForm.name;
  };

  onChangeName = (e) => {
    const name = e.target.value;
    this.setState({
      boardCreateForm: {
        name
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isValidation()) {
      return;
    }

    const {boardCreateForm} = this.state;
    const {boardStore, requestClose} = this.props;

    boardStore.createBoard(boardCreateForm).then(() => {
      requestClose();
    });
  };

  onChangeValue = (e) => {
    let {name, value} = e.target;
    let {boardCreateForm} = this.state;
    boardCreateForm[name] = value;
    this.setState({
      boardCreateForm
    });
  };

  render() {
    const {task} = this.props;
    const {boardCreateForm} = this.state;
    return (
      <div className="task-detail-modal modal">
        <h2>{"프로젝트 추가"}</h2>
        <FieldInput name={'name'} label={'프로젝트명'} value={boardCreateForm.name || ''} onChange={this.onChangeValue} />
        <ButtonGroup>
          <Button type={"submit"} onClick={this.onSubmit}>{'추가'}</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default BoardItem;