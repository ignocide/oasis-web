import ReactDom from 'react-dom';
import { action, observable, reaction } from 'mobx';
import ToastrMessage from '../../dto/common/toastrMessage';
import { renderer as ToastrRenderer } from '../../components/common/Toastr';
import { Children } from 'react';

class ToastrStore {
  @observable messages: ToastrMessage[] = [];
  @observable isCunsumming = false;

  constructor(isServer: boolean, initialData: any = {}) {
    if (!isServer) {
    }
    this.messages = (initialData.messages || []).map((message: any) => new ToastrMessage(message));
  }

  @action
  alert(message: ToastrMessage) {
    this.messages.push(message);
    this.run();
  }

  @action
  run(): void {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      return;
    }
    if (this.isCunsumming || this.messages.length === 0) {
      return;
    }
    const message = this.messages[0];

    // const messageElement = document.createElement('div');
    // messageElement.className = 'toastr-node';
    // const text = document.createTextNode(message.message);

    // messageElement.appendChild(text);
    // toastrContainer.appendChild(messageElement);





    // const toastrConatiner = ReactDOM.findDOMNode('toastr-container')
    // const
    ToastrRenderer(message)
  }
}

export default ToastrStore;
