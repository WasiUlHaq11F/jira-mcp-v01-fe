import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { CheckCircle2, X as CloseIcon, Check as CheckIcon, EyeIcon, EditIcon, Trash2, Printer } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import RELEASE_CONSTANTS from "../../constants"
import { ReleaseIndex} from "../../interface"

interface ReleaseRowActionsProps {
    row: {
        original: ReleaseIndex
    }
}

export const ReleaseRowActions: React.FC<ReleaseRowActionsProps> = ({ row }) => {
    const dispatch = useAppDispatch();

    const { releaseId, releaseLabel } = row.original;
    const label = releaseLabel || '';
    const objKey = RELEASE_CONSTANTS.ENTITY_KEY;
    const primaryKeys = { [RELEASE_CONSTANTS.PRIMARY_KEY]: releaseId };

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
                    module: RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                }}
            />
            <DataTableAction
                label={label}
                title="Edit"
                colorVariant="warning"
                icon={EditIcon}
                onClick={() => handleAction('edit')}
                permission={{
                    module: RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                }}
            />
            <DataTableAction
                label={label}
                title="Delete"
                colorVariant="destructive"
                icon={Trash2}
                onClick={() => handleAction('delete')}
                permission={{
                    module: RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                    resource: RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                    action: RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                }}
            />
        </div>
    )
}
