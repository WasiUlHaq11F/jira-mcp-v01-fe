import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColumnDef } from '@tanstack/react-table';

interface PrintColumnSelectionDialogProps<TData> {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnDef<TData>[];
    columnVisibility?: Record<string, boolean>;
    onProceed: (selectedKeys: string[]) => void;
    paginationControls?: React.ReactNode;
}

export const PrintColumnSelectionDialog = <TData,>({
    isOpen,
    onClose,
    columns,
    columnVisibility,
    onProceed,
    paginationControls,
}: PrintColumnSelectionDialogProps<TData>) => {
    // Filter out selection and action columns, and also respect table column visibility
    const printableColumns = columns.filter(
        (col) => {
            const accessorKey = (col as any).accessorKey;
            // 1. Exclude select/actions
            if (col.id === 'select' || col.id === 'actions') return false;
            // 2. Must have an accessorKey to be printable in this template
            if (!accessorKey) return false;
            // 3. Respect columnVisibility from Data Table (if provided)
            if (columnVisibility && columnVisibility[accessorKey] === false) return false;

            return true;
        }
    );

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            setSelectedKeys(printableColumns.map((col) => (col as any).accessorKey));
        }
    }, [isOpen]);

    const handleToggle = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleSelectAll = () => {
        setSelectedKeys(printableColumns.map((col) => (col as any).accessorKey));
    };

    const handleClearAll = () => {
        setSelectedKeys([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] gap-4">
                <DialogHeader>
                    <DialogTitle>Select Columns to Print</DialogTitle>
                    <DialogDescription>
                        Choose the columns you want to include in the printed report.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <Button variant="secondary" size="sm" onClick={handleSelectAll}>
                        Select All
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleClearAll}>
                        Clear All
                    </Button>
                </div>
                <ScrollArea className="h-[300px] border rounded-md p-3">
                    <div className="space-y-4 p-1">
                        {printableColumns.map((col) => {
                            const key = (col as any).accessorKey || col.id;

                            let label: string = "";
                            if (typeof col.header === 'string') {
                                label = col.header;
                            } else if (typeof col.header === 'function') {
                                // Simulate rendering to extract the title prop if using DataTableColumnHeader
                                const context = { column: { id: key }, table: {} } as any;
                                const headerElement = col.header(context);
                                if (headerElement && typeof headerElement === 'object' && 'props' in headerElement) {
                                    label = (headerElement as any).props.title || (headerElement as any).props.children;
                                }
                            }

                            if (!label) {
                                label = (col.meta as any)?.headerTitle || key || col.id;
                            }

                            return (
                                <div key={key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`col-${key}`}
                                        checked={selectedKeys.includes(key)}
                                        onCheckedChange={() => handleToggle(key)}
                                    />
                                    <Label
                                        htmlFor={`col-${key}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {label}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
                {paginationControls}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => onProceed(selectedKeys)} disabled={selectedKeys.length === 0}>
                        Proceed to Print
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
