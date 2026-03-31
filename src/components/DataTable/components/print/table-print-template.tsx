import { flexRender, ColumnDef } from '@tanstack/react-table';

interface TablePrintTemplateProps<TData> {
    title: string;
    columns: ColumnDef<TData>[];
    data: TData[];
}

export const TablePrintTemplate = <TData,>({
    title,
    columns,
    data,
}: TablePrintTemplateProps<TData>) => {
    // Filter out selection and action columns
    const printableColumns = columns.filter(
        (col) => col.id !== 'select' && col.id !== 'actions' && (col as any).accessorKey
    );

    return (
        <div className="printable-content p-8 bg-white text-black space-y-6">
            <style>
                {`
                @media print {
                    @page {
                        size: landscape;
                        margin: 10mm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    .printable-content {
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                    }
                    table {
                        width: 100% !important;
                        table-layout: auto !important;
                        border-collapse: collapse !important;
                        font-size: 9pt !important;
                    }
                    th {
                        color:#000 !important;
                        background-color: #f9fafb !important;
                        white-space: nowrap !important; /* Keep titles in one line */
                        text-transform: uppercase !important;
                        font-weight: bold !important;
                        border-bottom: 2px solid #e5e7eb !important;
                    }
                    th, td {
                        padding: 6px 4px !important;
                        border: 1px solid #e5e7eb !important;
                        text-align: left !important;
                    }
                    td {
                        white-space: normal !important;
                        word-wrap: break-word !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-primary pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary">{title}</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">
                        Generated on {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            {printableColumns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                                >
                                    {(() => {
                                        const key = (col as any).accessorKey;
                                        if (typeof col.header === 'string') return col.header;
                                        if (typeof col.header === 'function') {
                                            const context = { column: { id: key }, table: {} } as any;
                                            const headerElement = col.header(context);
                                            if (headerElement && typeof headerElement === 'object' && 'props' in headerElement) {
                                                return (headerElement as any).props.title || (headerElement as any).props.children || key || col.id;
                                            }
                                        }
                                        return (col.meta as any)?.headerTitle || key || col.id;
                                    })()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {printableColumns.map((col, colIndex) => {
                                    const key = (col as any).accessorKey || col.id;
                                    const value = (row as any)[key];

                                    // Mock the cell context for rendering
                                    const cellContext = {
                                        row: {
                                            original: row,
                                            getValue: (id: string) => (row as any)[id],
                                            originalRow: row
                                        },
                                        column: col,
                                        getValue: () => value,
                                        renderValue: () => value,
                                        table: {} as any
                                    };

                                    return (
                                        <td
                                            key={colIndex}
                                            className="px-4 py-2 text-sm text-gray-700 border-r last:border-r-0"
                                        >
                                            {col.cell
                                                ? flexRender(col.cell, cellContext as any)
                                                : (value != null ? String(value) : '-')}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t text-right text-xs text-gray-400">
                Total Records: {data.length}
            </div>
        </div>
    );
};
