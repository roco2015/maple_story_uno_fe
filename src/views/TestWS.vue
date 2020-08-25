<template>
  <div>
    <button v-if="!socket" @click="login">login</button>
    <input v-model="text" />
    <button v-if="socket" @click="send">send</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class TestWS extends Vue {
  socket: WebSocket | null = null;
  text = '';

  login() {
    this.socket = new WebSocket('ws://localhost:3002');
    console.log('----new-----');
    this.socket.onopen = () => {
      console.log('socket连接成功');
    };
    this.socket.onmessage = ({ data }) => {
      console.log('------收到消息啦--------');
      console.log(data);
    };
  }
  send() {
    if (!this.socket) {
      return;
    }

    this.socket.send(this.getMessageStr(this.text));
  }

  getMessageStr(text: string) {
    return JSON.stringify({
      code: 0,
      type: 10005,
      body: {
        text
      }
    });
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
