import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import appRouter from "./routes/index.ts";
import appStore from "./stores/index.ts";
const app = createApp(App)
app.use(appStore)
app.use(appRouter)

app.mount('#app')
