import { vi } from "./vi";
import { en } from "./en";
import MisaEnum  from "@/js/base/enum";

export function translate(locale, word) {
  switch (locale) {
    case MisaEnum.Lang.Vietnamese:
      return vi[word] == "" || vi[word] == undefined ? word : vi[word];
    case MisaEnum.Lang.English:
      return en[word] == "" || en[word] == undefined ? word : en[word];
    default:
      return word;
  }
}
