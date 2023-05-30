
export function exportToExcel(data, headers, fileName) {
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
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
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
  
