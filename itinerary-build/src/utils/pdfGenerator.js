import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * captureElementToPdf(element, filename)
 * - element: DOM node to capture
 * - filename: string
 */
export async function captureElementToPdf(element, filename = "itinerary.pdf") {
  if (!element) throw new Error("No element provided to capture");

  // create canvas at double scale for clarity
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  // if height fits in one page
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  const totalPages = Math.ceil(imgHeight / pageHeight);
  for (let i = 1; i < totalPages; i++) {
    pdf.addPage();
    position = -pageHeight * i;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  }

  pdf.save(filename);
}
