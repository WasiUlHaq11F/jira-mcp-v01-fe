import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import TICKET_RELEASE_CONSTANTS from "../../constants"
import { TicketReleaseIndex} from "../../interface"

interface TicketReleaseRowActionsProps {
    row: {
        original: TicketReleaseIndex
    }
}

export const TicketReleaseRowActions: React.FC<TicketReleaseRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { ticketReleaseId, ticketReleaseLabel } = row.original;
    const label = ticketReleaseLabel || '';
    const objKey = TICKET_RELEASE_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [TICKET_RELEASE_CONSTANTS.PRIMARY_KEY]: ticketReleaseId };

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
                    module: TICKET_RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: TICKET_RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: TICKET_RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: TICKET_RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: TICKET_RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
