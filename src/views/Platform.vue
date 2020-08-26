<template>
  <div>
    <div v-if="!socket">
      <input v-model="username" />
      <button @click="login">login</button>
    </div>
    <div v-if="socket">
      <input v-model="roomId" />
      <button @click="enterRoom">enterRoom</button>
    </div>
    <div>
      <p v-for="msg of messageList" :key="msg.id">{{ msg.from.name }}: {{ msg.body.text }}</p>
    </div>
    <div v-if="socket">
      <input v-model="text" />
      <button @click="sendText">send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import WS from '@/service/ws';

@Component
export default class Platform extends Mixins(WS) {
  socket: WebSocket | null = null;
  text = '';
  username = '';
  roomId = '0';
  messageList: string[] = [];

  login() {
    this.createConn();
    this.onopen();
    this.onmessage();
  }

  @Watch('status')
  sendUserInfo(val: number) {
    if (val) {
      this.sendUserInfoMessage(this.username);
    }
  }

  onmessage() {
    if (!this.socket) return;
    this.socket.onmessage = ({ data }) => {
      this.messageList.push(this.resolveMsg(data));
    };
  }

  enterRoom() {
    this.sendRoomMessage(this.roomId);
  }

  sendText() {
    this.sendTextMessage(this.text);
    this.text = '';
  }
}
</script>

<style lang="less"></style>
