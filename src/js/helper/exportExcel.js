/* eslint-disable no-unused-vars */
/**
 * Export data to excel file
 * @param {*} data Object array
 * @param {*} headers Header array
 * @param {*} fileName name of the file
 * @param {*} sheetName name of the sheet
 * Created By: NQTruong (01/06/2023)
 */
export function exportToExcel(data, headers, columnWidths, fileName='Test1', sheetName = 'Sheet1') {
    const XLSX = require('xlsx');
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Modify the column headers
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: headerRange.s.c + index });
      worksheet[cellAddress].v = header;
      worksheet[cellAddress].w = header;
    });
  
    // Set column widths
    columnWidths.forEach((width, index) => {
      worksheet['!cols'] = worksheet['!cols'] || [];
      worksheet['!cols'][index] = { wpx: width ? parseInt(width): 200 };
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
  
    const blobData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    if (navigator.msSaveBlob) {
      // For IE 10 and above
      navigator.msSaveBlob(blobData, fileName);
    } else {
      // For other browsers
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blobData);
      link.download = fileName;
      link.click();
    }
  }
  /**
   * Export to excel file through table data
   * @param {*} tableData data of table to export
   * @param {*} fileName name of excel file to export
   * @param {*} sheetName name of excel file to export
   */
export const exportTableData = (tableData,fileName = 'Test', sheetName='Sheet1') =>{
  const {header,data} = tableData;
  const headers = header.map(header => header.label)
  const columnWidths = header.map(header=>header.minWidth)
  const datas = data.map((row) => {
    return header.reduce((obj,key,index)=>{
      console.log('obj', obj, 'key', key, 'index', index, 'row', row);
      obj[key.prop] = row[key.prop];
      return obj
    }, {} )
  });
  exportToExcel(datas, headers,columnWidths, fileName,sheetName)
}