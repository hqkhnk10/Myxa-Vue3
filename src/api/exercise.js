import request from "@/axios";
const hostUrl = "https://localhost:7059/api/";

export const getExercises = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: "Exercise",
    params: params,
  });
  return res;
};
