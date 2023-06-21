import request from "@/axios";
const hostUrl = "https://localhost:7059/api/";

export const getSubjects = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: "Subject",
    params: params,
  });
  return res;
};
