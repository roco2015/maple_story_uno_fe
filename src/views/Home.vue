<template>
  <div class="home">
    <div class="login">
      <van-form validate-first @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-button type="primary" block native-type="submit">登录</van-button>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  username = '';

  onSubmit(values: any) {
    this.login(values.username);
  }

  async login(username: string) {
    this.$store.commit('setUsername', username);
    await this.$store.dispatch('createSocket');
    this.$router.push({
      name: 'platform'
    });
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow: hidden;
}
.login {
  position: relative;
  top: 36%;
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transform: translateY(-50%);
  overflow: hidden;
}
</style>
