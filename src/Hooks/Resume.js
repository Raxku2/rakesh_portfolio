const Resume = () => {
    const docUrl = "https://docs.google.com/document/d/1CbaCAJp3vh4amaeGf0XuUF4Jh3EOLhJS4tyo_NSjVms/edit?usp=sharing"

    // Extract the document ID from the URL
    const docIdMatch = docUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!docIdMatch || !docIdMatch[1]) {
        console.error("Invalid Google Doc URL.");
        return;
    }
    const docId = docIdMatch[1];

    // Construct the export URL for the Google Doc
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=pdf`;

    // Fetch the file and download it with the desired name
    fetch(exportUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob(); // Get the file as a Blob
        })
        .then(blob => {
            // Create a temporary URL for the Blob
            const fileURL = URL.createObjectURL(blob);

            // Trigger the download with the specified file name
            const link = document.createElement("a");
            link.href = fileURL;
            link.download = "Rakesh_Kundu_Resume.pdf"; // Rename the file as desired
            link.click();

            // Clean up the URL to free memory
            URL.revokeObjectURL(fileURL);
        })
        .catch(error => {
            console.log("Failed to download the file:", error);
        });
}

export default Resume;