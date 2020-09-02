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
    curRoom: {
      id: '',
      userCount: 0
    },
    messageList: blankMessageList,
    socket: blankWS,
    socketStatus: 0
  },
  mutations: {
    setUsername(state, username) {
      localStorage.setItem('username', username);
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
    },
    setCurRoomId(state, id) {
      localStorage.setItem('curRoomId', id);
      state.curRoom.id = id;
    },
    setCurUserCount(state, userCount) {
      state.curRoom.userCount = userCount;
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
          localStorage.setItem('connected', '0');
        };
        state.socket.onmessage = ({ data }) => {
          const msg = JSON.parse(data);
          switch (msg.type) {
            case 10005:
              commit('addMessage', msg);
              break;
            case 10006:
              commit('setRoomIds', msg.body.roomIds);
              break;
            case 10007:
              commit('setCurRoomId', msg.body.curRoom.id);
              commit('setCurUserCount', msg.body.curRoom.userCount);
              break;
            case 10008:
              break;
            case 10009:
              Vue.prototype.$notify({ type: 'primary', message: `${msg.body.username}加入了房间` });
              break;
          }
        };
        state.socket.onopen = () => {
          console.log('socket连接成功');
          dispatch('send', MessageFactory.getUserInfoMsg(state.username));
          state.socketStatus = 1;
          localStorage.setItem('connected', '1');
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
