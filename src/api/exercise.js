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
export const getDetailExercise = async (params) => {
  const res = await request.get({
    baseURL: hostUrl,
    url: `Exercise/${params}`,
  });
  return res;
};
export const addExercise = async (data) => {
  const res = await request.post({
    baseURL: hostUrl,
    url: "Exercise",
    data: data,
  });
  return res;
};
