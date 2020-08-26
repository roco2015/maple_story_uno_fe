import { Component, Vue } from 'vue-property-decorator';
@Component
export default class WS extends Vue {
  socket: WebSocket | null = null;
  createConn() {
    this.socket = new WebSocket('ws://localhost:3002');
  }
  onopen() {
    if (!this.socket) return;
    this.socket.onopen = () => {
      console.log('socket连接成功');
    };
  }

  onmessage(ws: any) {
    console.log('------收到消息啦--------');
    console.log(ws.data);
  }

  sendRoomMessage(roomId: string) {
    if (!this.socket) return;
    this.socket.send(this.stringfyMsg(this.getEnterRoomMessage(roomId)));
  }

  sendTextMessage(text: string) {
    if (!this.socket) return;
    this.socket.send(this.stringfyMsg(this.getTextMessage(text)));
  }

  resolveMsgContent(msgstr: string) {
    const msg = this.resolveMsg(msgstr);
    return msg.body;
  }

  resolveMsg(msgstr: string) {
    return JSON.parse(msgstr);
  }

  stringfyMsg(msg: object) {
    return JSON.stringify(msg);
  }

  getTextMessage(text: string) {
    return {
      code: 0,
      type: 10005,
      body: {
        text
      }
    };
  }

  getEnterRoomMessage(roomId: string) {
    return {
      code: 0,
      type: 10002,
      body: {
        roomId
      }
    };
  }
}
