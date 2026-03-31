import React from 'react';
export interface PrintItem {
    label: string;
    value: React.ReactNode;
}
interface SingleRecordPrintTemplateProps {
    title: string;
    items: PrintItem[];
}

export const SingleRecordPrintTemplate: React.FC<SingleRecordPrintTemplateProps> = ({
    title,
    items,
}) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="printable-content p-8 bg-white text-black space-y-6 max-w-4xl mx-auto border shadow-sm print:shadow-none print:border-none">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-primary pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">{title} Record</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">Internal Document</p>
                </div>
            </div>

            <div className="flex flex-col h-full">
                <div className="grid grid-cols-1 md:grid-cols-1 items-start">
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 py-3 border-b last:border-0">
                            <span className="font-medium text-sm">{item.label}</span>
                            <div className="col-span-2 text-sm">
                                <div className="truncate">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


