import Vue from 'vue';
import Vuex from 'vuex';
import { MessageFactory } from '@/utils/MessageFactory';

Vue.use(Vuex);

const blankWS = ((): WebSocket | null => {
  return null;
})();
const blankMessageList = ((): object[] => {
  return [];
})();

export default new Vuex.Store({
  state: {
    username: '',
    roomIds: [],
    messageList: blankMessageList,
    socket: blankWS,
    socketStatus: 0
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    addMessage(state, message: object) {
      state.messageList.push(message);
    },
    setRoomIds(state, roomIds) {
      state.roomIds = roomIds;
    }
  },
  actions: {
    async createSocket({ state, commit, dispatch }) {
      return new Promise(resolve => {
        if (state.socketStatus) {
          return resolve();
        }
        state.socket = new WebSocket('ws://localhost:3002');
        state.socket.onclose = () => {
          console.log('socket连接关闭');
          state.socketStatus = 0;
        };
        state.socket.onmessage = ({ data }) => {
          const msg = JSON.parse(data);
          switch (msg.type) {
            case 10005:
              commit('addMessage', msg);
              break;
            case 10006:
              commit('setRoomIds', msg.body.roomIds);
          }
        };
        state.socket.onopen = () => {
          console.log('socket连接成功');
          dispatch('send', MessageFactory.getUserInfoMsg(state.username));
          state.socketStatus = 1;
          resolve();
        };
      });
    },
    send({ state }, msg) {
      if (!state.socket) return;
      state.socket.send(JSON.stringify(msg));
    },
    // 发
    sendTextMessage({ state, dispatch }, text: string) {
      if (!state.socket) return;
      dispatch('send', MessageFactory.getTextMsg(text));
    }
  },
  modules: {}
});
