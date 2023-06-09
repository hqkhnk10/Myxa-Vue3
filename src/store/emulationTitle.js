import { defineStore } from "pinia";
import request from "@/axios";
import { dispatchNotification } from "@/components/Notification";
import { globals } from "@/main";
const defaultSort = {
  // inactiveSort: true,
  // applyObjectSort: false,
  // commendationLevelSort: false,
  // emulationTitleNameSort: true,
};
const url = "EmulationTitle";
export const useEmulationTitleStore = defineStore("useEmulationTitleStore", {
  state: () => ({
    tableData: [],
    loading: false,
    currentRow: {},
    id: 999,
    total: 0,
    parameters: {},
    header: [
      {
        label: "Tên danh hiệu thi đua",
        prop: "emulationTitleName",
        minWidth: "310px",
        width: "675px",
        sort: null,
      },
      {
        label: "Mã danh hiệu",
        prop: "emulationTitleCode",
        minWidth: "160px",
        width: "160px",
      },
      {
        label: "Đối tượng khen thưởng",
        prop: "applyObject",
        minWidth: "180px",
        width: "180px",

        slot: true,
        sort: null,
      },
      {
        label: "Cấp khen thưởng",
        prop: "commendationLevel",
        minWidth: "200px",
        width: "200px",

        slot: true,
        sort: null,
      },
      {
        label: "Loại phong trào",
        prop: "movementType",
        minWidth: "200px",
        width: "200px",

        slot: true,
        sort: null,
      },
      {
        label: "Trạng thái",
        prop: "inactive",
        minWidth: "180px",
        width: "180px",
        slot: true,
        sort: null,
      },
    ],
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
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    getAPI(params) {
      this.loading = true;
      let defaultsort = { ...defaultSort };
      Object.assign(defaultsort, params);
      Object.assign(this.parameters, defaultsort); //keep the original parameters
      request
        .get({ url: url, params: this.parameters })
        .then((res) => {
          this.tableData = res.data.map(row => ({
            applyObject: row.applyObject,
            commendationLevel: row.commendationLevel,
            emulationTitleCode: row.emulationTitleCode,
            emulationTitleID: row.emulationTitleID,
            emulationTitleName: row.emulationTitleName,
            emulationTitleNote:row.emulationTitleNote,
            inactive:row.inactive,
            movementType:row.movementType,
          }));
          this.total = res?.pagination?.count;
        })

        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Get detail of table
     * @param {*} id {id: Number} id of the row
     * @returns Promise<axios>
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    async getDetailAPI(id) {
      return await request.get({ url: `${url}/${id}` });
    },
    /**
     * Post data to backend
     * @param {*} data fromBody all the data of the row
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    async addAPI(data) {
      return await request.post({ url: url, data: data });
    },
    /**
     * PUT data to backend
     * @param {*} data Frombody all the data of the row
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    async editAPI(data) {
      await request.put({ url: `${url}/${data.emulationTitleID}`, data: data });
    },
    /**
     * Call API to remove the row
     * @param {*} id id of row
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    deleteAPI(id) {
      request
        .delete({ url: `${url}/${id}` })
        .then(() => {
          dispatchNotification({
            content: globals.t("reuse.deleteSuccess"),
            type: "success",
          });
          this.getAPI();
        })
    },
    /**
     * Delete multiple items from the table
     * @param {*} data Array of id
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    async deleteMultipleAPI(data) {
      await request.delete({ url: `${url}/Multiple`, data: data });
    },
    /**
     * Change status of emulation title
     * @param {*} data
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    updateStatusAPI(data) {
      request
        .put({ url: `${url}/Status`, data: data })
        .then(() => {
          dispatchNotification({
            content: globals.t("reuse.editSuccess"),
            type: "success",
          });
          this.getAPI();
        })
    },
    /**
     * edit multiple status from the table
     * @param {*} data Array of id
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    async updateMultipleStatusAPI(data) {
      return await request.put({ url: `${url}/MulitpleStatus`, data: data });
    },
    /**
     * If sort value change => call API
     * @param {*} index
     * @param {*} value
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    changeSortStore(index, value) {
      if (this.header[index].sort !== undefined) {
        this.header[index].sort = value;
        this.getAPI({ [`${this.header[index].prop}Sort`]: value });
      }
    },
    /**
     * Add state only (only in FE)
     * @param {*} rowObj
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    add(rowObj) {
      const row = { EmulationTitleID: this.id++, ...rowObj };
      this.tableData.unshift(row);
    },
    /**
     * Edit state only (only in FE)
     * @param {*} rowObj
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    edit(rowObj) {
      const findIndex = this.tableData.findIndex(
        (row) => row.EmulationTitleID == rowObj.EmulationTitleID
      );
      this.tableData[findIndex] = { ...this.tableData[findIndex], ...rowObj };
    },
    /**
     * Remove state only (only in FE)
     * @param {*} rowObj
     * Created At: 25/05/2023
     * Created By: NQTruong
     */
    removeRows(rowArray) {
      this.tableData = this.tableData.filter(
        (tableRow) => !rowArray.includes(tableRow)
      );
    },
  },
});
