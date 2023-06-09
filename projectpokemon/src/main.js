import { createApp } from 'vue'
import App from './App.vue'
import router from './routing'
import store from './store'

import './index.css'

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');