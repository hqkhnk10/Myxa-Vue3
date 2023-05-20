import { defineStore } from "pinia";
import request from "@/axios";
import { dispatchNotification } from "@/components/Notification";

const url = "EmulationTitle";
export const useEmulationTitleStore = defineStore("useEmulationTitleStore", {
  state: () => ({
    tableData: [],
    loading: false,
    currentRow: {},
    id: 999,
    total: 20,
    parameters: {
    },
  }),
  getters: {
    data(state) {
      return state.tableData;
    },
  },
  actions: {
    /**
     * Get data from backend
     * @param {*} params (optional) to filter or pagination
     */
    async getAPI(params) {
      this.loading = true;
      Object.assign(this.parameters, params); //keep the original parameters
      await request
        .get({ url: url, params: this.parameters })
        .then((res) => {
          dispatchNotification({
            content: "Lấy dữ liệu thành công",
            type: "success",
          });
          this.tableData = res.data;
          this.total = res?.pagination?.count;
        })
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.message ? err.response.data.message : err.message,
            type: "error",
          });
        }).finally(()=>{
      this.loading = false;
        });
    },
    /**
     * Get detail of table
     * @param {*} params {id: Number} id of the row
     * @returns Promise<axios>
     */
    async getDetailAPI(params) {
      return await request.get({ url: `${url}/Detail`, params: params });
    },
    /**
     * Post data to backend
     * @param {*} data fromBody all the data of the row
     */
    async addAPI(data) {
      return await request.post({ url: url, data: data })
    },
    /**
     * PUT data to backend
     * @param {*} data Frombody all the data of the row
     */
    async editAPI(data) {
      await request
        .put({ url: url, data: data })
        .then(() => {
          dispatchNotification({
            content: "Sửa thành công",
            type: "success",
          });
          this.getAPI();

        })
        .catch((err) => {
          console.log("err", err);
          dispatchNotification({
            content: err?.response?.data?.message ? err.response.data.message : err.message,
            type: "error",
          });
        });
    },
    /**
     * Call API to remove the row
     * @param {*} data id of row
     */
    async deleteAPI(data) {
      await request
        .delete({ url: url, params: data })
        .then(() => {
          dispatchNotification({
            content: "Xóa thành công",
            type: "success",
          });
          this.getAPI();
        })
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.message ? err.response.data.message : err.message,
            type: "error",
          });
          console.log("err", err);
        });
    },
    /**
     * Delete multiple items from the table
     * @param {*} data Array of id
     */
    async deleteMultipleAPI(data) {
      await request
        .delete({ url: `${url}/Multiple`, data: data })
        .then(() => {
          dispatchNotification({
            content: "Xóa thành công",
            type: "success",
          });
          this.getAPI();
        })
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.message ? err.response.data.message : err.message,
            type: "error",
          });
          console.log("err", err);
        });
    },
    add(rowObj) {
      const row = { EmulationTitleID: this.id++, ...rowObj };
      this.tableData.unshift(row);
    },
    edit(rowObj) {
      const findIndex = this.tableData.findIndex(
        (row) => row.EmulationTitleID == rowObj.EmulationTitleID
      );
      this.tableData[findIndex] = { ...this.tableData[findIndex], ...rowObj };
    },
    removeRows(rowArray) {
      this.tableData = this.tableData.filter(
        (tableRow) => !rowArray.includes(tableRow)
      );
    },
  },
});
