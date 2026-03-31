import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/util/formatDate"
import { TicketIndex } from "../../interface"
import { TicketRowActions } from "../row-actions"

export const ticketGetColumns = (multiSortEnabled: boolean = false): ColumnDef<TicketIndex>[] => {
	return [
		{
			accessorKey: "ticketId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketId")}</span>,
		},
		{
			accessorKey: "title",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Title" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("title")}</span>,
		},
		{
			accessorKey: "description",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Description" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("description")}</span>,
		},
		{
			accessorKey: "assignedById",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Assigned By Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("assignedById")}</span>,
		},
		{
			accessorKey: "assignedToId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Assigned To Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("assignedToId")}</span>,
		},
		{
			accessorKey: "issueType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Issue Type" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("issueType")}</span>,
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("status")}</span>,
		},
		{
			accessorKey: "dueDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Due Date" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("dueDate"), 'DATE')}</span>,
		},
		{
			accessorKey: "timeLogHour",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Time Log Hours" />
			),
			cell: ({ row }) => <span>{row.getValue("timeLogHour") ?? "-"}</span>,
		},
		{
			accessorKey: "isBlocked",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Is Blocked" />
			),
			cell: ({ row }) => {
				const value = row.getValue("isBlocked") as boolean
				return (
					<Badge variant={value ? "default" : "secondary"}>
						{value ? "Yes" : "No"}
					</Badge>
				)
			},
		},
		{
			accessorKey: "blockerDescription",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Blocker Description" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("blockerDescription")}</span>,
		},
		{
			accessorKey: "jiraTicketId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Jira Ticket Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("jiraTicketId")}</span>,
		},
		{
			accessorKey: "jiraLink",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Jira Link" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("jiraLink")}</span>,
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
			cell: ({ row }) => <TicketRowActions row={row} />,
		},
	]
}
