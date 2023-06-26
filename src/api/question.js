import request from "@/axios";
const hostUrl = "https://localhost:7059/api/";

export const getQuestions = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: "Question",
    params: params,
  });
  return res;
};
export const postQuestion = async (data) => {
    const res = await request.post({
      baseURL: hostUrl,
      url: "Question",
      data: data,
    });
    return res;
  };
