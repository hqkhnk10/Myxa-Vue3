import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"
import mitt from "mitt";

import App from './App.vue'
import MisaButtonVue from './components/MisaButton.vue'
import MisaInputVue from './components/MisaInput.vue'
import MisaDialogVue from './components/MisaDialog.vue'
import MisaComboboxVue from './components/MisaCombobox.vue'
import MisaCheckboxVue from './components/MisaCheckbox.vue'
import MisaTableVue from './components/MisaTable.vue'
import MisaPaginationVue from './components/MisaPagination.vue'
import MisaDropdownVue from './components/MisaDropdown.vue'
import MisaLoadingVue from './components/MisaLoading.vue'

import MisaEnum from './js/base/enum'

import { router } from './routers/router'
import { translate } from './lang/multipleLanguages'
import { useLangStore } from './store/lang';

const emitter = mitt();
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
vue.component("misa-pagination",MisaPaginationVue)
vue.component("misa-dropdown",MisaDropdownVue)
vue.component("misa-loading",MisaLoadingVue)

vue.config.globalProperties.$enum=MisaEnum;
vue.config.globalProperties.emitter = emitter;

const locale = useLangStore();
vue.config.globalProperties.t = function(word){
    return translate(locale.getLocale,word)
}
vue.mount('#app')
