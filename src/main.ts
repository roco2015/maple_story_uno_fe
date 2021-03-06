import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Button, Field, Form, Grid, GridItem, Notify } from 'vant';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Notify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
