import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import MisaButtonVue from './components/MisaButton.vue'
import MisaInputVue from './components/MisaInput.vue'
import MisaDialogVue from './components/MisaDialog.vue'
import MisaComboboxVue from './components/MisaCombobox.vue'
import MisaCheckboxVue from './components/MisaCheckbox.vue'
import MisaTableVue from './components/MisaTable.vue'
import { router } from './routers/router'
import { translate } from './lang/multipleLanguages'
import { useLangStore } from './store/lang'

const pinia = createPinia()
const vue = createApp(App)
vue.use(router)
vue.use(pinia)

const locale = useLangStore()

vue.component("misa-button",MisaButtonVue)
vue.component("misa-input",MisaInputVue)
vue.component("misa-dialog",MisaDialogVue)
vue.component("misa-combobox",MisaComboboxVue)
vue.component("misa-checkbox",MisaCheckboxVue)
vue.component("misa-table",MisaTableVue)

vue.config.globalProperties.t = function(word){
    return translate(locale.getLocale,word)
}
vue.mount('#app')
