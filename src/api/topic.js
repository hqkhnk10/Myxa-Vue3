import request from "@/axios";
const hostUrl = "https://localhost:7059/api/";

export const getTopics = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: "Topic",
    params: params,
  });
  return res;
};
