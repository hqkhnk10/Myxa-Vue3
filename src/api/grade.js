import request from "@/axios";
const hostUrl = "https://localhost:7059/api/";

export const getGrades = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: "Grade",
    params: params,
  });
  return res;
};
