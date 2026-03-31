import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { SprintIndex } from "../../interface"
import { SprintRowActions } from "../row-actions"

export const sprintGetColumns = (multiSortEnabled: boolean = false): ColumnDef<SprintIndex>[] => {
	return [
		{
			accessorKey: "sprintId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Sprint Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("sprintId")}</span>,
		},
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "startDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Start Date" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("startDate"), 'DATE')}</span>,
		},
		{
			accessorKey: "endDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="End Date" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("endDate"), 'DATE')}</span>,
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("status")}</span>,
		},
		{
			accessorKey: "jiraSprintId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Jira Sprint Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("jiraSprintId")}</span>,
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
			cell: ({ row }) => <SprintRowActions row={row} />,
		},
	]
}
