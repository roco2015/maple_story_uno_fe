<template>
  <div>
    <div v-show="socketStatus">
      <button @click="refresh">刷新房间信息</button>
      <div class="room-box">
        <div v-for="roomId of roomIds" :key="roomId" class="room" @click="enterRoom(roomId)">{{ roomId }}</div>
      </div>
      <div class="new-room">
        <input v-model="roomId" />
        <button @click="enterRoom(roomId)">新建房间</button>
      </div>
    </div>
    <div>
      <p v-for="msg of messageList" :key="msg.id">{{ msg.from.name }}: {{ msg.body.text }}</p>
    </div>
    <div v-show="socketStatus">
      <input v-model="text" />
      <button @click="sendText">send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MessageFactory } from '@/utils/MessageFactory';

@Component
export default class Platform extends Vue {
  text = '';
  username = '';
  roomId = '0';
  get socketStatus() {
    return this.$store.state.socketStatus;
  }
  get roomIds() {
    return this.$store.state.roomIds;
  }
  get messageList() {
    return this.$store.state.messageList;
  }

  mounted() {
    this.refresh();
  }

  refresh() {
    this.$store.dispatch('send', MessageFactory.getRefreshRoomMsg);
  }

  enterRoom(roomId: string) {
    this.roomId = roomId;
    this.$store.dispatch('send', MessageFactory.getEnterRoomMsg(roomId));
  }

  sendText() {
    this.$store.dispatch('sendTextMessage', this.text);
    this.text = '';
  }
}
</script>

<style lang="less">
.room {
  width: 30px;
  height: 45px;
  border: 1px solid #aaa;
  line-height: 45px;
  text-align: center;
}
</style>
