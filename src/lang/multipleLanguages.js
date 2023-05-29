import { vi } from "./vi";
import { en } from "./en";
import { globals } from "@/main";

/**
 * Translate word depend on language
 * @param {*} word word
 * @param {*} locale language
 * @returns Translated word
 * Created date: 10/05/2023
 * Created by: NQTruong
 */
export function translate(word, locale = 'vi') {
  switch (locale) {
    case globals.$enum.Lang.Vietnamese:
      return get(vi, word, word);
    case globals.$enum.Lang.English:
      return get(en, word, word);
    default:
      return word;
  }
}
/**
 * Access the value of a nested object using a path
 * @param {*} obj object
 * @param {*} path path
 * @param {*} defaultValue default value returned if no value
 * @returns word
 * Created date: 10/05/2023
 * Created by: NQTruong
 */
function get(obj, path, defaultValue) {
  if(!obj || !path){
    return ''
  }
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}