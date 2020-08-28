<template>
  <div class="home">
    <input v-model="username" />
    <a @click="login">登录</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  username = '';

  async login() {
    this.$store.commit('setUsername', this.username);
    await this.$store.dispatch('createSocket');
    this.$router.push({
      name: 'platform'
    });
  }
}
</script>

<style lang="less" scoped></style>
