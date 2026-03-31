import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { TicketReleaseIndex } from "../../interface"
import { TicketReleaseRowActions } from "../row-actions"

export const ticketReleaseGetColumns = (multiSortEnabled: boolean = false): ColumnDef<TicketReleaseIndex>[] => {
	return [
		{
			accessorKey: "ticketReleaseId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Release Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketReleaseId")}</span>,
		},
		{
			accessorKey: "ticketId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketId")}</span>,
		},
		{
			accessorKey: "releaseId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Release Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("releaseId")}</span>,
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created At" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("createdAt"), 'DATE_TIME')}</span>,
		},
		{
			accessorKey: "updatedAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Updated At" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("updatedAt"), 'DATE_TIME')}</span>,
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => <TicketReleaseRowActions row={row} />,
		},
	]
}
