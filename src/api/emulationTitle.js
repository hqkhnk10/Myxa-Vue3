import request from "@/axios";

export const insertMultipleEmulationTitle = async (data) => {
    const res = await request.post({ url: 'EmulationTitle/InsertMultiple', data: data})
    return res
}