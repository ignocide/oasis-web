export interface IToastrMessage {
  message: string;
  duration: number;
  type: TOASTR_TYPES;
}

export enum TOASTR_TYPES {
  WARNING,
  SUCCESS,
  ERROR,
}

class ToastrMessage {
  message: string;
  duration: number;
  type: TOASTR_TYPES;

  constructor(toastrMessage: ToastrMessage | string) {
    if (typeof toastrMessage === 'string') {
      toastrMessage = {
        message: toastrMessage,
        duration: 2000,
        type: TOASTR_TYPES.SUCCESS
      };
    }

    this.message = toastrMessage.message;
    this.duration = toastrMessage.duration;
    this.type = toastrMessage.type;
    console.log("this",this)
  }
}

export default ToastrMessage