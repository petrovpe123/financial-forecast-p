import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FinancialRecord } from './types';

export async function generateFinancialReportPDF(records: FinancialRecord[]): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a page with light background
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  
  // Embed fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Light mode colors
  const textColor = rgb(0.1, 0.1, 0.1);
  const headerColor = rgb(0.2, 0.2, 0.2);
  const lineColor = rgb(0.8, 0.8, 0.8);
  
  // Title
  page.drawText('Financial Report', {
    x: 50,
    y: height - 50,
    size: 24,
    font: fontBold,
    color: headerColor,
  });
  
  // Add date
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  page.drawText(`Generated: ${today}`, {
    x: 50,
    y: height - 75,
    size: 10,
    font,
    color: textColor,
  });
  
  // Table headers
  const tableTop = height - 120;
  const rowHeight = 25;
  const colWidths = [90, 90, 90, 90, 135];
  const colX = [50, 140, 230, 320, 410];
  
  // Draw header background
  page.drawRectangle({
    x: 45,
    y: tableTop - 5,
    width: width - 90,
    height: rowHeight,
    color: rgb(0.95, 0.95, 0.95),
  });
  
  // Draw header text
  const headers = ['Date', 'Revenue', 'Expenses', 'Cash Flow', 'Category'];
  headers.forEach((header, i) => {
    page.drawText(header, {
      x: colX[i],
      y: tableTop + 5,
      size: 11,
      font: fontBold,
      color: headerColor,
    });
  });
  
  // Draw horizontal line below header
  page.drawLine({
    start: { x: 45, y: tableTop - 5 },
    end: { x: width - 45, y: tableTop - 5 },
    thickness: 1,
    color: lineColor,
  });
  
  // Limit to first 10 rows only
  const limitedRecords = records.slice(0, 10);
  
  // Draw data rows
  limitedRecords.forEach((record, index) => {
    const y = tableTop - (index + 1) * rowHeight;
    
    // Format date
    const date = new Date(record.timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit' 
    });
    
    // Format currency values
    const revenue = `$${record.revenue.toLocaleString()}`;
    const expenses = `$${record.expenses.toLocaleString()}`;
    const cashFlow = `$${record.cash_flow.toLocaleString()}`;
    
    // Draw row data
    const rowData = [date, revenue, expenses, cashFlow, record.category];
    rowData.forEach((text, i) => {
      page.drawText(text, {
        x: colX[i],
        y: y + 5,
        size: 10,
        font,
        color: textColor,
      });
    });
    
    // Draw separator line
    if (index < limitedRecords.length - 1) {
      page.drawLine({
        start: { x: 45, y: y },
        end: { x: width - 45, y: y },
        thickness: 0.5,
        color: lineColor,
      });
    }
  });
  
  // Add footer note
  const footerY = tableTop - (limitedRecords.length + 1) * rowHeight - 20;
  page.drawText(`Showing ${limitedRecords.length} of ${records.length} records`, {
    x: 50,
    y: footerY,
    size: 9,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  // Serialize the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'financial-report.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
