import ToastrMessage, { TOASTR_TYPES, IToastrMessage } from './toastrMessage';

describe('vo/common/toastrMessage', () => {
  test('constructor as string', () => {
    const message: string = 'message'
    const toastrMessage = new ToastrMessage(message)

    expect(toastrMessage.message).toEqual(message);
    expect(toastrMessage.type).toEqual(TOASTR_TYPES.SUCCESS);
    expect(toastrMessage.duration).toEqual(2000);
  });

  test('constructor as object', () => {
    const mock: IToastrMessage = {
      message: 'message',
      type: TOASTR_TYPES.ERROR,
      duration: 1000
    }
    const toastrMessage = new ToastrMessage(mock)

    expect(toastrMessage.message).toEqual(mock.message);
    expect(toastrMessage.type).toEqual(mock.type);
    expect(toastrMessage.duration).toEqual(mock.duration);
  });
});