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
    total: 20,
    parameters: {},
    header: [
      {
        label: "Tên danh hiệu thi đua",
        prop: "emulationTitleName",
        width: "310px",
        sort: null,
      },
      {
        label: "Mã danh hiệu",
        prop: "emulationTitleCode",
        width: "160px",
      },
      {
        label: "Đối tượng khen thưởng",
        prop: "applyObject",
        width: "180px",
        slot: true,
        sort: null,
      },
      {
        label: "Cấp khen thưởng",
        prop: "commendationLevel",
        width: "200px",
        slot: true,
        sort: null,
      },
      {
        label: "Loại phong trào",
        prop: "movementType",
        width: "200px",
        slot: true,
        sort: null,
      },
      {
        label: "Trạng thái",
        prop: "inactive",
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
     * Created By: QTNgo
     */
     getAPI(params) {
      this.loading = true;
      let defaultsort = { ...defaultSort };
      Object.assign(defaultsort, params);
      Object.assign(this.parameters, defaultsort); //keep the original parameters
       request
        .get({ url: url, params: this.parameters })
        .then((res) => {
          this.tableData = res.data;
          this.total = res?.pagination?.count;
        })
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
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
     * Created By: QTNgo
     */
    async getDetailAPI(id) {
      return await request.get({ url: `${url}/${id}` });
    },
    /**
     * Post data to backend
     * @param {*} data fromBody all the data of the row
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
    async addAPI(data) {
      return await request.post({ url: url, data: data });
    },
    /**
     * PUT data to backend
     * @param {*} data Frombody all the data of the row
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
    async editAPI(data) {
      await request.put({ url: `${url}/${data.emulationTitleID}`, data: data });
    },
    /**
     * Call API to remove the row
     * @param {*} id id of row
     * Created At: 25/05/2023
     * Created By: QTNgo
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
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        });
    },
    /**
     * Delete multiple items from the table
     * @param {*} data Array of id
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
     async deleteMultipleAPI(data) {
       await request
        .delete({ url: `${url}/Multiple`, data: data })
;
    },
    /**
     * Change status of emulation title
     * @param {*} data
     * Created At: 25/05/2023
     * Created By: QTNgo
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
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        });
    },
    /**
     * edit multiple status from the table
     * @param {*} data Array of id
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
     async updateMultipleStatusAPI(data) {
       return await request.put({ url: `${url}/MulitpleStatus`, data: data })

    },
    /**
     * If sort value change => call API
     * @param {*} index
     * @param {*} value
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
    changeSortStore(index, value) {
      if (this.header[index].sort !== undefined) {
        this.header[index].sort = value;
        if (value == null) {
          this.getAPI();
        } else {
          this.getAPI({ [`${this.header[index].prop}Sort`]: value });
        }
      }
    },
    /**
     * Add state only (only in FE)
     * @param {*} rowObj
     * Created At: 25/05/2023
     * Created By: QTNgo
     */
    add(rowObj) {
      const row = { EmulationTitleID: this.id++, ...rowObj };
      this.tableData.unshift(row);
    },
    /**
     * Edit state only (only in FE)
     * @param {*} rowObj
     * Created At: 25/05/2023
     * Created By: QTNgo
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
     * Created By: QTNgo
     */
    removeRows(rowArray) {
      this.tableData = this.tableData.filter(
        (tableRow) => !rowArray.includes(tableRow)
      );
    },
  },
});
