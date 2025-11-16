import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FinancialRecord } from '@/lib/types';

interface DataTableProps {
  data: FinancialRecord[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Raw Data Preview</h3>
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
