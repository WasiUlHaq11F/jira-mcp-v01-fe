import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { NotificationIndex } from "../../interface"
import { NotificationRowActions } from "../row-actions"

export const notificationGetColumns = (multiSortEnabled: boolean = false): ColumnDef<NotificationIndex>[] => {
	return [
		{
			accessorKey: "notificationId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Notification Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("notificationId")}</span>,
		},
		{
			accessorKey: "ticketId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticket Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("ticketId")}</span>,
		},
		{
			accessorKey: "recipientId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Recipient Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("recipientId")}</span>,
		},
		{
			accessorKey: "typeName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Type Name" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("typeName")}</span>,
		},
		{
			accessorKey: "message",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Message" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("message")}</span>,
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("status")}</span>,
		},
		{
			accessorKey: "notificationChannel",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Notification Channel" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("notificationChannel")}</span>,
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
			cell: ({ row }) => <NotificationRowActions row={row} />,
		},
	]
}
