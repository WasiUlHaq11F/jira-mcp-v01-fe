import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { TicketSprintIndex } from "../../interface"
import { TicketSprintRowActions } from "../row-actions"

export const ticketSprintGetColumns = (multiSortEnabled: boolean = false): ColumnDef<TicketSprintIndex>[] => {
	return [
		{
			accessorKey: "ticketSprintId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Sprint Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketSprintId")}</span>,
		},
		{
			accessorKey: "ticketId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketId")}</span>,
		},
		{
			accessorKey: "sprintId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Sprint Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("sprintId")}</span>,
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
			cell: ({ row }) => <TicketSprintRowActions row={row} />,
		},
	]
}
