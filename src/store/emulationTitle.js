import { defineStore } from "pinia";
import request from "@/axios";

const url = "EmulationTitle"
export const useEmulationTitleStore = defineStore("useEmulationTitleStore", {
  state: () => ({
    tableData: [],
    id: 999,
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      total: 20,
    },
  }),
  getters: {
    data(state) {
      return state.tableData;
    },
  },
  actions: {
    async getAPI(params) {
      await request
        .get({ url: url, params: params })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res?.pagination?.count;
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    async addAPI(data) {
      await request
        .post({ url: url, data: data })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    async editAPI(data) {
      await request
        .post({ url: url, data: data })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // since we rely on `this`, we cannot use an arrow function
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
