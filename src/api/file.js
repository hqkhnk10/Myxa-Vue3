import request from "@/axios";

export const postSingleFile = async (data) => {
    const res = await request.post({ url: 'Files/PostSingleFile',data:data, headersType: 'multipart/form-data' })
    return res
}