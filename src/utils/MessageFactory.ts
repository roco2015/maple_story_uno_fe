export class MessageFactory {
  static readonly getTextMsg = (text: string) => {
    return {
      code: 0,
      type: 10005,
      body: {
        text
      }
    };
  };
  static readonly getEnterRoomMsg = (roomId: string) => {
    return {
      code: 0,
      type: 10002,
      body: {
        roomId
      }
    };
  };
  static readonly getUserInfoMsg = (name: string) => {
    return {
      code: 0,
      type: 10001,
      body: {
        name
      }
    };
  };
  static readonly getRefreshRoomMsg = {
    code: 0,
    type: 10006,
    body: {}
  };

  static readonly getReconnectMsg = (roomId: string) => {
    return {
      code: 0,
      type: 10010,
      body: {
        roomId
      }
    };
  };

  static readonly getReadyMsg = {
    code: 0,
    type: 10011,
    body: {}
  };

  static readonly getCancelReadyMsg = {
    code: 0,
    type: 10012,
    body: {}
  };
}
