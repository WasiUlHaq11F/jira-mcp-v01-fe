import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import NOTIFICATION_CONSTANTS from '../../constants';
import { memo } from 'react';

export const NotificationCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${NOTIFICATION_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: NOTIFICATION_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${NOTIFICATION_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: NOTIFICATION_CONSTANTS.PERMISSIONS.MODULE,
                resource: NOTIFICATION_CONSTANTS.PERMISSIONS.RESOURCE,
                action: NOTIFICATION_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
            }} />
    )
})