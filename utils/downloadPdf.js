import axios from "axios";

const downloadPdf = async (url) => {
    const response = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 30000,
    });

    const buffer = Buffer.from(response.data);

    const pdfHeader = buffer.subarray(0, 5).toString();

    if (pdfHeader !== "%PDF-") {
        throw new Error(
            `Downloaded file is not a valid PDF. File header: ${pdfHeader}`
        );
    }

    return buffer;
};

export default downloadPdf;