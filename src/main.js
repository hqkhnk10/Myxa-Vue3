import { createApp } from 'vue'
import App from './App.vue'
import MisaButtonVue from './components/MisaButton.vue'
import MisaInputVue from './components/MisaInput.vue'
import MisaDialogVue from './components/MisaDialog.vue'
import MisaComboboxVue from './components/MisaCombobox.vue'
import MisaCheckboxVue from './components/MisaCheckbox.vue'
import { router } from './routers/router'

const vue = createApp(App)
vue.use(router)
vue.component("misa-button",MisaButtonVue)
vue.component("misa-input",MisaInputVue)
vue.component("misa-dialog",MisaDialogVue)
vue.component("misa-combobox",MisaComboboxVue)
vue.component("misa-checkbox",MisaCheckboxVue)
vue.mount('#app')
