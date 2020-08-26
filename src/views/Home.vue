<template>
  <div class="home">
    <input v-model="username" />
    <router-link to="/login" :query="{ username: username }">登录</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  username = '';
}
</script>
