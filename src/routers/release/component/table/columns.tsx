import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ReleaseIndex } from "../../interface"
import { ReleaseRowActions } from "../row-actions"

export const releaseGetColumns = (multiSortEnabled: boolean = false): ColumnDef<ReleaseIndex>[] => {
	return [
		{
			accessorKey: "releaseId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Release Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("releaseId")}</span>,
		},
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "versionNumber",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Version Number" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("versionNumber")}</span>,
		},
		{
			accessorKey: "releaseDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Release Date" />
			),
			cell: ({ row }) => <span>{formatDate(row.getValue("releaseDate"), 'DATE')}</span>,
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("status")}</span>,
		},
		{
			accessorKey: "jiraReleaseId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Jira Release Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("jiraReleaseId")}</span>,
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
			cell: ({ row }) => <ReleaseRowActions row={row} />,
		},
	]
}
