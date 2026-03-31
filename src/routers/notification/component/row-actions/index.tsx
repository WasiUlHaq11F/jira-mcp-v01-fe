import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import NOTIFICATION_CONSTANTS from "../../constants"
import { NotificationIndex} from "../../interface"

interface NotificationRowActionsProps {
    row: {
        original: NotificationIndex
    }
}

export const NotificationRowActions: React.FC<NotificationRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { notificationId, notificationLabel } = row.original;
    const label = notificationLabel || '';
    const objKey = NOTIFICATION_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [NOTIFICATION_CONSTANTS.PRIMARY_KEY]: notificationId };

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
                    module: NOTIFICATION_CONSTANTS.PERMISSIONS.MODULE,
                    resource: NOTIFICATION_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: NOTIFICATION_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: NOTIFICATION_CONSTANTS.PERMISSIONS.MODULE,
                    resource: NOTIFICATION_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: NOTIFICATION_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: NOTIFICATION_CONSTANTS.PERMISSIONS.MODULE,
                    resource: NOTIFICATION_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: NOTIFICATION_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
