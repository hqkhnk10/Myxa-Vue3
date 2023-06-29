import MisaEnum from "../base/enum";
/**
 * Trả ra số
 * @param {*} number
 * @returns
 * Created By: NQTruong (20/06/2023)
 */
export const formatNumber = (number) => {
  return number.toLocaleString();
};
/**
 * Đổi dữ liệu thành formdata
 * @param {*} data
 * @returns
 * Created By: NQTruong (20/06/2023)
 */
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
/**
 * Đồi index thành chữ cái
 * @param {*} index
 * @returns
 * Created By: NQTruong (20/06/2023)
 */
export const formatIndexToAlphabet = (index) => {
  return String.fromCharCode(index + 65);
};
/**
 * Lấy background theo type của câu hỏi
 * @param {*} type
 * @returns
 * Created By: NQTruong (20/06/2023)
 */
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
/**
 * Decode xss html
 * @param {*} text
 * @returns
 * Created By: NQTruong (20/06/2023)
 */
export const decodeHtml = (text) => {
  const span = document.createElement("span");
  return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
    span.innerHTML = entity;
    return span.innerText;
  });
};

export const formatBgBaseOnSubjectId = (id) => {
  switch (id) {
    case 1:
      return "purple";
    case 2:
      return "green";
    case 3:
      return "blue";
    default:
      return "default";
  }
};
export const formatStatusExercise = (type) => {
  switch (type) {
    case 1:
      return "Đã soạn";
    case 0:
      return "Đang soạn";
    case 3:
      return "Đã chia sẻ";
    case 4:
      return "Chưa chia sẻ";
    case 5:
      return "Lấy từ thư viện";
    default:
      return ""
  }
};


/**
 * Lấy background của câu trả lời
 * @param {*} index
 * Created By: NQTruong (20/06/2023)
 */
export const getAnswerBg = (index) => {
  switch (index % 4) {
    case 1: //1,5,9
      return "answer-bg-pink";
    case 2: //2,6,10
      return "answer-bg-green";
    case 3: //3,7,11
      return "answer-bg-orange";
    case 0: //4,8,12
      return "answer-bg-blue";
    default:
      return "answer-bg-white";
  }
};