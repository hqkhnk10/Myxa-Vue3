export const saveFileToClient = (fileName, response) =>{
  const file = new Blob([response], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a temporary URL for the file
  const fileURL = URL.createObjectURL(file);

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = fileURL;
  downloadLink.setAttribute("download", fileName);

  // Trigger the download by simulating a click on the link
  downloadLink.click();

  // Clean up the temporary URL and link
  URL.revokeObjectURL(fileURL);
  downloadLink.remove();
}