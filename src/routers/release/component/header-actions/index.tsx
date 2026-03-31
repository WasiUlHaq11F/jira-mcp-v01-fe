import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import RELEASE_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ReleaseCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${RELEASE_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: RELEASE_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${RELEASE_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: RELEASE_CONSTANTS.PERMISSIONS.MODULE,
                resource: RELEASE_CONSTANTS.PERMISSIONS.RESOURCE,
                action: RELEASE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
            }} />
    )
})