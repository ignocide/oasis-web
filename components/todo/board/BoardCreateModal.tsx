import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore, { ITaskCreateForm } from '../../../store/boardStore';
import { FieldInput } from "../../form/Field";
import { Button } from "../../form";

import '../../../style/todo/board-item.scss';
import { ModalBody, ModalFooter, ModalForm, ModalHeader } from "../../common/ModalForm";

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
    },
    modalOpen: false
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
    const { boardCreateForm } = this.state;

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

    const { boardCreateForm } = this.state;
    const { boardStore, requestClose } = this.props;

    boardStore.createBoard(boardCreateForm).then(() => {
      requestClose();
    });
  };

  onChangeValue = (e) => {
    let { name, value } = e.target;
    let { boardCreateForm } = this.state;
    boardCreateForm[name] = value;
    this.setState({
      boardCreateForm
    });
  };

  render() {
    const { task } = this.props;
    const { boardCreateForm, modalOpen } = this.state;
    return (
      <ModalForm>
        <ModalHeader>{'프로젝트 추가'}</ModalHeader>
        <ModalBody>
          <FieldInput name={'name'} label={'프로젝트명'} value={boardCreateForm.name || ''} onChange={this.onChangeValue} />
        </ModalBody>
        <ModalFooter>
          <Button shape={'text'} type={"submit"} onClick={this.onSubmit}>{'추가'}</Button>
        </ModalFooter>
      </ModalForm>
    );
  }
}

export default BoardItem;