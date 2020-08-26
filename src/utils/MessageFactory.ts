export default {
  getTextMessage: (text: string) => {
    return {
      code: 0,
      type: 10005,
      body: {
        text
      }
    };
  },

  getEnterRoomMessage: (roomId: string) => {
    return {
      code: 0,
      type: 10002,
      body: {
        roomId
      }
    };
  },

  getUserInfoMessage: (name: string) => {
    return {
      code: 0,
      type: 10001,
      body: {
        name
      }
    };
  }
};
