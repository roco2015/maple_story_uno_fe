<template>
  <div class="platform">
    <div v-show="socketStatus" class="room-box">
      <van-button block @click="refresh">刷新全部房间信息</van-button>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="roomId of roomIds"
          :key="roomId"
          icon="wap-home-o"
          :text="`房间号: ${roomId}`"
          @click="enterRoom(roomId)"
        />
      </van-grid>
      <van-field v-model="roomId" center clearable label="房间号" placeholder="请输入新的房间号">
        <template #button>
          <van-button size="small" type="primary" @click="enterRoom(roomId)">加入新房间</van-button>
        </template>
      </van-field>
      <div class="row">
        <span>当前所在房间: {{ curRoomId }}</span>
        <span style="text-align: right;">房间人数: {{ curUserCount }}</span>
      </div>
    </div>
    <div class="message-box">
      <div class="message-list">
        <p v-for="msg of messageList" :key="msg.id">{{ msg.from.name }}: {{ msg.body.text }}</p>
      </div>
      <div v-show="socketStatus" class="send-box">
        <van-field v-model="text" center clearable label="" placeholder="请输入要发送的消息">
          <template #button>
            <van-button size="small" type="primary" @click="sendText(text)">send</van-button>
          </template>
        </van-field>
      </div>
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
  roomId = '';
  get socketStatus() {
    return this.$store.state.socketStatus;
  }
  get roomIds() {
    return this.$store.state.roomIds;
  }
  get messageList() {
    return this.$store.state.messageList;
  }
  get curRoomId() {
    return this.$store.state.curRoom.id;
  }

  get curUserCount() {
    return this.$store.state.curRoom.userCount;
  }

  mounted() {
    this.refresh();
  }

  refresh() {
    this.$store.dispatch('send', MessageFactory.getRefreshRoomMsg);
  }

  enterRoom(roomId: string) {
    this.roomId = '';
    this.$store.dispatch('send', MessageFactory.getEnterRoomMsg(roomId));
  }

  sendText() {
    this.$store.dispatch('sendTextMessage', this.text);
    this.text = '';
  }
}
</script>

<style lang="less">
.platform {
  display: flex;
  flex-flow: column;
  height: 100vh;
  .message-box {
    flex: 1;
    position: relative;
    .message-list {
      padding: 10px;
    }
    .send-box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
.room {
  width: 30px;
  height: 45px;
  border: 1px solid #aaa;
  line-height: 45px;
  text-align: center;
}
.row {
  display: flex;
  padding: 10px;
  span {
    flex: 1;
  }
}
</style>
