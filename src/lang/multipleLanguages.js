import { vi } from "./vi";
import { en } from "./en";
import { useLangStore } from "@/store/lang";
import { createPinia } from 'pinia'
const store = createPinia()
const locale = useLangStore(store)

export function translate(word){
    switch (locale.getLocale) {
        case 'vi':
            return vi[word] == '' || vi[word] == undefined ? word : vi[word]
        case 'en':
            return en[word]
        default:
            return word
    }
}