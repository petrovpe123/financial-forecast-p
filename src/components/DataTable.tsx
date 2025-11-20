import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FinancialRecord } from '@/lib/types';
import { generateFinancialReportPDF, downloadPDF } from '@/lib/pdfExport';
import { FilePdf } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface DataTableProps {
  data: FinancialRecord[];
}

export function DataTable({ data }: DataTableProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const pdfBytes = await generateFinancialReportPDF(data);
      downloadPDF(pdfBytes, 'financial-report.pdf');
      toast.success('PDF exported successfully', {
        description: 'Your financial report has been downloaded'
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF', {
        description: 'An error occurred while generating the PDF'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Raw Data Preview</h3>
        <Button 
          onClick={handleExportPDF} 
          disabled={isExporting || data.length === 0}
          variant="outline"
          size="sm"
        >
          <FilePdf weight="duotone" />
          Export PDF
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Expenses</TableHead>
              <TableHead className="text-right">Cash Flow</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {new Date(record.timestamp).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </TableCell>
                <TableCell className="text-right tabular-nums text-secondary font-semibold">
                  ${record.revenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold" style={{ color: 'var(--expense-color)' }}>
                  ${record.expenses.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold">
                  ${record.cash_flow.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{record.category}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
