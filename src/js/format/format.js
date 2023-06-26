import MisaEnum from "../base/enum";

export const formatNumber = (number) => {
  return number.toLocaleString();
};
export const convertToFormData = (data) => {
  return Object.keys(data).reduce((form, key) => {
    if (data[key] != null && typeof data[key] != "undefined") {
      form.append(key, data[key]);
      if (Array.isArray(data[key]) && data[key].length > 0)
        data[key].forEach((el) => {
          form.append(key, el);
        });
    }
    return form;
  }, new FormData());
};
export const formatIndexToAlphabet = (index) => {
  return String.fromCharCode(index + 65);
};

export const formatBgBaseOnQuestionType = (type) => {
  switch (type) {
    case MisaEnum.QuestionType.Choosing:
      return "blue";
    case MisaEnum.QuestionType.TrueFalse:
      return "pink";
    default:
      return "";
  }
};
export const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}