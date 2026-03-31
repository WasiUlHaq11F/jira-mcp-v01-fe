import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import SPRINT_CONSTANTS from '../../constants';
import { memo } from 'react';

export const SprintCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${SPRINT_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: SPRINT_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${SPRINT_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: SPRINT_CONSTANTS.PERMISSIONS.MODULE,
                resource: SPRINT_CONSTANTS.PERMISSIONS.RESOURCE,
                action: SPRINT_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
            }} />
    )
})