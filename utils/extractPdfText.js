import { PDFParse } from "pdf-parse";

const extractPdfText = async (buffer) => {
    const parser = new PDFParse({
        data: buffer,
    });

    try {
        const data = await parser.getText();

        return data.text;
    } finally {
        await parser.destroy();
    }
};

export default extractPdfText;