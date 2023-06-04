import request from "@/axios";

export const postSingleFile = async (data) => {
    const res = await request.post({ url: 'Files/PostSingleFile',data:data, headersType: 'multipart/form-data' })
    return res
}
export const downloadFile = async (params) => {
    const res = await request.get({ url: 'Files/download',params:params, responseType: 'arraybuffer' })
    return res
}