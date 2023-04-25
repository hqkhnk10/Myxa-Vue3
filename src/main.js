import { createApp } from 'vue'
import App from './App.vue'
import MisaButtonVue from './components/MisaButton.vue'
import MisaInputVue from './components/MisaInput.vue'


const vue = createApp(App)
vue.component("misa-button",MisaButtonVue)
vue.component("misa-input",MisaInputVue)

vue.mount('#app')
