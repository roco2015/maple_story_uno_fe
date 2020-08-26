import { Component, Vue } from 'vue-property-decorator';
import MsgFactory from '@/utils/MessageFactory';
@Component
export default class WS extends Vue {
  socket: WebSocket | null = null;
  status = 0;

  createConn() {
    this.socket = new WebSocket('ws://localhost:3002');
  }
  onopen() {
    if (!this.socket) return;
    this.socket.onopen = () => {
      console.log('socket连接成功');
      this.status = 1;
    };
  }

  // 发
  sendUserInfoMessage(username: string) {
    if (!this.socket) return;
    this.send(MsgFactory.getUserInfoMessage(username));
  }

  sendRoomMessage(roomId: string) {
    if (!this.socket) return;
    this.send(MsgFactory.getEnterRoomMessage(roomId));
  }

  sendTextMessage(text: string) {
    if (!this.socket) return;
    this.send(MsgFactory.getTextMessage(text));
  }

  send(msg: object) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(msg));
  }

  resolveMsg(msgstr: string) {
    return JSON.parse(msgstr);
  }
}
