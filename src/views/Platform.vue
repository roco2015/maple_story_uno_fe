<template>
  <div>
    <button v-if="!socket" @click="login">login</button>
    <div v-if="socket">
      <input v-model="roomId" />
      <button @click="enterRoom">enterRoom</button>
    </div>
    <div>
      <p v-for="msg of messageList" :key="msg">{{ msg }}</p>
    </div>
    <div v-if="socket">
      <input v-model="text" />
      <button @click="send">send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import WS from '@/service/ws';

@Component
export default class Platform extends Mixins(WS) {
  socket: WebSocket | null = null;
  text = '';
  roomId = '0';
  messageList: string[] = [];

  login() {
    this.createConn();
    this.onopen();
    this.onmessage();
  }

  onmessage() {
    if (!this.socket) return;
    this.socket.onmessage = ({ data }) => {
      this.messageList.push(this.resolveMsgContent(data).text);
    };
  }

  enterRoom() {
    this.sendRoomMessage(this.roomId);
  }

  send() {
    this.sendTextMessage(this.text);
    this.text = '';
  }
}
</script>

<style lang="less"></style>
