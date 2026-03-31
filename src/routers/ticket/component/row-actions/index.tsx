import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import TICKET_CONSTANTS from "../../constants"
import { TicketIndex} from "../../interface"

interface TicketRowActionsProps {
    row: {
        original: TicketIndex
    }
}

export const TicketRowActions: React.FC<TicketRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { ticketId, ticketLabel } = row.original;
    const label = ticketLabel || '';
    const objKey = TICKET_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [TICKET_CONSTANTS.PRIMARY_KEY]: ticketId };

    const handleAction = (mode: string) => {
        dispatch(setSelectedObj({
            objKey,
            mode,
            label,
            primaryKeys
        }));
    };

    return (
        <div className="flex space-x-2">
            <DataTableAction
                label={label}
                title="View Details"
                variant="outline"
                size="icon"
                icon={EyeIcon}
                onClick={() => handleAction('view')}
                permission={{
                    module: TICKET_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: TICKET_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: TICKET_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
