import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"

import App from './App.vue'
import MisaButtonVue from './components/MisaButton.vue'
import MisaInputVue from './components/MisaInput.vue'
import MisaDialogVue from './components/MisaDialog.vue'
import MisaComboboxVue from './components/MisaCombobox.vue'
import MisaCheckboxVue from './components/MisaCheckbox.vue'
import MisaTableVue from './components/MisaTable.vue'
import { router } from './routers/router'
import { translate } from './lang/multipleLanguages'

const pinia = createPinia()
const vue = createApp(App)
vue.use(router)
vue.use(pinia)
vue.use(vClickOutside)

vue.component("misa-button",MisaButtonVue)
vue.component("misa-input",MisaInputVue)
vue.component("misa-dialog",MisaDialogVue)
vue.component("misa-combobox",MisaComboboxVue)
vue.component("misa-checkbox",MisaCheckboxVue)
vue.component("misa-table",MisaTableVue)


vue.config.globalProperties.t = function(word){
    return translate(word)
}
vue.mount('#app')
