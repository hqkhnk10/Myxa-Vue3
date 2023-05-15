import { defineStore } from "pinia";
import request from '@/axios'

export const useEmulationTitleStore = defineStore("useEmulationTitleStore", {
  state: () => ({
    tableData: [
      {
        EmulationTitleName: "Lao động tiên tiến",
        EmulationTitleCode: "LĐTTCX",
        ApplyObject: 2,
        CommendationLevel: 3,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 50,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Chiến sĩ thi đua cơ sở",
        EmulationTitleCode: "CSTĐCS",
        ApplyObject: 2,
        CommendationLevel: 2,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 48,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Lao động tiên tiến",
        EmulationTitleCode: "LĐTTCH",
        ApplyObject: 2,
        CommendationLevel: 2,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 49,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Chiến sĩ thi đua cấp bộ",
        EmulationTitleCode: "CSTĐCB",
        ApplyObject: 2,
        CommendationLevel: 1,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 46,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Chiến sĩ thi đua cấp tỉnh",
        EmulationTitleCode: "CSTĐCT",
        ApplyObject: 2,
        CommendationLevel: 1,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 47,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "a",
        EmulationTitleCode: "A",
        ApplyObject: 2,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 61,
        IsSystem: 0,
      },
      {
        EmulationTitleName: "Chiến sĩ thi đua toàn quốc",
        EmulationTitleCode: "CSTĐTQ",
        ApplyObject: 2,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 45,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "ds",
        EmulationTitleCode: "D",
        ApplyObject: 2,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 63,
        IsSystem: 0,
      },
      {
        EmulationTitleName: "l d t t c x",
        EmulationTitleCode: "LDTTCX",
        ApplyObject: 2,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 57,
        IsSystem: 0,
      },
      {
        EmulationTitleName: "sda",
        EmulationTitleCode: "LĐTT",
        ApplyObject: 2,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 65,
        IsSystem: 0,
      },
      {
        EmulationTitleName: "Tập thể lao động tiên tiến",
        EmulationTitleCode: "TTLĐTT",
        ApplyObject: 1,
        CommendationLevel: 2,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 55,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua cấp bộ",
        EmulationTitleCode: "CTĐCB",
        ApplyObject: 1,
        CommendationLevel: 1,
        MovementType: -1,
        Inactive: 0,
        EmulationTitleID: 52,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua cấp tỉnh",
        EmulationTitleCode: "CTĐCT",
        ApplyObject: 1,
        CommendationLevel: 1,
        MovementType: -1,
        Inactive: 0,
        EmulationTitleID: 53,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Tập thể lao động xuất sắc",
        EmulationTitleCode: "TTLĐXS",
        ApplyObject: 1,
        CommendationLevel: 1,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 54,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "tẻwr343gdsgd",
        EmulationTitleCode: "Tfdgsd",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: 0,
        Inactive: 0,
        EmulationTitleID: 59,
        IsSystem: 0,
      },
      {
        EmulationTitleName: "Cờ thi đua của Chính phủ",
        EmulationTitleCode: "CTĐCP",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: -1,
        Inactive: 1,
        EmulationTitleID: 51,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua của Chính phủ",
        EmulationTitleCode: "CTĐCP",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: -1,
        Inactive: 1,
        EmulationTitleID: 51,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua của Chính phủ",
        EmulationTitleCode: "CTĐCP",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: -1,
        Inactive: 1,
        EmulationTitleID: 51,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua của Chính phủ",
        EmulationTitleCode: "CTĐCP",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: -1,
        Inactive: 1,
        EmulationTitleID: 51,
        IsSystem: 1,
      },
      {
        EmulationTitleName: "Cờ thi đua của Chính phủ",
        EmulationTitleCode: "CTĐCP",
        ApplyObject: 1,
        CommendationLevel: 0,
        MovementType: -1,
        Inactive: 1,
        EmulationTitleID: 51,
        IsSystem: 1,
      },
    ],
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
    async getAPI(){
      const res = await request.get({url: 'entries'})
      console.log('res', res);
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
