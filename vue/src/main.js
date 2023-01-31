import { createApp } from 'vue'
import store from './stores';
import App from './App.vue'
import router from './router'
const app = createApp(App)
import './assets/main.css'

app.use(store)
app.use(router)
app.mount('#app')
