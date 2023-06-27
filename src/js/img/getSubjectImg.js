const defaultImg = require("@/assets/emis/subjects-avatar/default.png");
const toan = require("@/assets/emis/subjects-avatar/toan.png");
const tienganh = require("@/assets/emis/subjects-avatar/tienganh.png");
const diali = require("@/assets/emis/subjects-avatar/diali.png");
const gdcd = require("@/assets/emis/subjects-avatar/gdcd.png");
const lichsu = require("@/assets/emis/subjects-avatar/lichsu.png");
const nguvan = require("@/assets/emis/subjects-avatar/nguvan.png");

export const getSubjectImg = (img) => {
  switch (img) {
    case "toan.png":
      return toan;
    case "tienganh.png":
      return tienganh;
    case "diali.png":
      return diali;
    case "gdcd.png":
      return gdcd;
    case "lichsu.png":
      return lichsu;
    case "nguvan.png":
      return nguvan;
    case "default.png":
      return defaultImg;
    default:
      return defaultImg;
  }
};

export const getSubjectImgFromId = (id) => {
  switch (id) {
    case 1:
      return toan;
    case 2:
      return nguvan;
    case 3:
      return tienganh;
    case 4:
      return gdcd;
    case 10:
      return diali;

    default:
      return defaultImg;
  }
};
export { defaultImg, toan, tienganh, diali, gdcd, lichsu, nguvan };
