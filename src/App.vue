<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MessageFactory } from '@/utils/MessageFactory';

@Component
export default class App extends Vue {
  created() {
    const connected = localStorage.getItem('connected');
    if (connected) {
      this.reConnect();
    }
  }

  async reConnect() {
    this.$store.commit('setUsername', localStorage.getItem('username'));
    await this.$store.dispatch('createSocket');
    this.$store.dispatch('send', MessageFactory.getReconnectMsg(localStorage.getItem('curRoomId') || '1001'));
  }
}
</script>

<style lang="less">
#app {
  color: @gray-8;
}
</style>
