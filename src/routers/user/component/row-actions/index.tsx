import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import USER_CONSTANTS from "../../constants"
import { UserIndex} from "../../interface"

interface UserRowActionsProps {
    row: {
        original: UserIndex
    }
}

export const UserRowActions: React.FC<UserRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { userId, userLabel } = row.original;
    const label = userLabel || '';
    const objKey = USER_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [USER_CONSTANTS.PRIMARY_KEY]: userId };

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
                    module: USER_CONSTANTS.PERMISSIONS.MODULE,
                    resource: USER_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: USER_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: USER_CONSTANTS.PERMISSIONS.MODULE,
                    resource: USER_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: USER_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: USER_CONSTANTS.PERMISSIONS.MODULE,
                    resource: USER_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: USER_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
