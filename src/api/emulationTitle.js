import request from "@/axios";

export const getSampleFileEmulationTitle = async () => {
    const res = await request.get({ url: 'EmulationTitle/SampleFile', responseType: 'arraybuffer' })
    return res
}
export const validateEmulationTitleFile = async (data) => {
    const res = await request.post({ url: 'EmulationTitle/ValidateFile', data: data, headersType: 'multipart/form-data'})
    return res
}