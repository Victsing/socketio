import Vue from 'vue';

import { router } from './helpers';
import App from 'App.vue';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});