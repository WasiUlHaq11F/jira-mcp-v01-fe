import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { UserIndex } from "../../interface"
import { UserRowActions } from "../row-actions"

export const userGetColumns = (multiSortEnabled: boolean = false): ColumnDef<UserIndex>[] => {
	return [
		{
			accessorKey: "userId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="User Id" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("userId")}</span>,
		},
		{
			accessorKey: "email",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("email")}</span>,
		},
		{
			accessorKey: "username",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Username" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("username")}</span>,
		},
		{
			accessorKey: "role",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			cell: ({ row }) => <span className="truncate">{row.getValue("role")}</span>,
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
			cell: ({ row }) => <UserRowActions row={row} />,
		},
	]
}
