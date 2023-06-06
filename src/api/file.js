import request from "@/axios";
const baseURL = "https://localhost:7206/api/";
export const postSingleFile = async (data) => {
    const res = await request.post({ baseURL: baseURL, url: 'File/PostSingleFile',data:data, headersType: 'multipart/form-data' })
    return res
}
export const downloadFile = async (params) => {
    const res = await request.get({ baseURL: baseURL, url: 'File/download',params:params, responseType: 'arraybuffer' })
    return res
}
export const getSampleFile = async (params) => {
    const res = await request.get({ baseURL: baseURL, url: 'File/SampleFile', params:params, responseType: 'arraybuffer' })
    return res
}
export const validateFile = async (data) => {
    const res = await request.post({ baseURL: baseURL, url: 'File/ValidateFile', data: data, headersType: 'multipart/form-data'})
    return res
}
export const exportFile = async (data) => {
    const res = await request.post({ baseURL: baseURL, url: 'File/ExportFile', data: data, responseType: 'arraybuffer'})
    return res
}