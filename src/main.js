import { createApp } from 'vue'
import App from './App.vue'
import MISAButton from './components/MISAButton.vue'

const vue = createApp(App)
vue.component("misa-button",MISAButton)
vue.mount('#app')
