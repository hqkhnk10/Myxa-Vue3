import { vi,en } from "./vi";

export function translate(locale, word){
    switch (locale) {
        case 'vi':
            return vi[word]
        case 'en':
            return en[word]
        default:
            return word
    }
}