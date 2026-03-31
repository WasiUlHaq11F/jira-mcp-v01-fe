import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import SPRINT_CONSTANTS from "../../constants"
import { SprintIndex} from "../../interface"

interface SprintRowActionsProps {
    row: {
        original: SprintIndex
    }
}

export const SprintRowActions: React.FC<SprintRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { sprintId, sprintLabel } = row.original;
    const label = sprintLabel || '';
    const objKey = SPRINT_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [SPRINT_CONSTANTS.PRIMARY_KEY]: sprintId };

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
                    module: SPRINT_CONSTANTS.PERMISSIONS.MODULE,
                    resource: SPRINT_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: SPRINT_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: SPRINT_CONSTANTS.PERMISSIONS.MODULE,
                    resource: SPRINT_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: SPRINT_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: SPRINT_CONSTANTS.PERMISSIONS.MODULE,
                    resource: SPRINT_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: SPRINT_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
