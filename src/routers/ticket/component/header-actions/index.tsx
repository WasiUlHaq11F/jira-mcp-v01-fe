import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import TICKET_CONSTANTS from '../../constants';
import { memo } from 'react';

export const TicketCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${TICKET_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: TICKET_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${TICKET_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: TICKET_CONSTANTS.PERMISSIONS.MODULE,
                resource: TICKET_CONSTANTS.PERMISSIONS.RESOURCE,
                action: TICKET_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
            }} />
    )
})