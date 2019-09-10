import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    if (!this.$store.state.nickname) {
      console.log('main loadUser');
      this.$store.dispatch('loadUser');
    }
    // console.log(this.$store.state.isLogin);
  },
  render: h => h(App),
}).$mount('#app');
