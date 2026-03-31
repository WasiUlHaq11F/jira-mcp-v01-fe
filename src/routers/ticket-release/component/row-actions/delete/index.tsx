import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteTicketRelease } from '../../../service';
import TICKET_RELEASE_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const TicketReleaseDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteTicketRelease,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await deleteMutation.mutateAsync(primaryKeys);
            toast.success(`${TICKET_RELEASE_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${TICKET_RELEASE_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [deleteMutation, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={TICKET_RELEASE_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={deleteMutation.isPending}
        />
    );
});

TicketReleaseDelete.displayName = 'TicketReleaseDelete';

export default TicketReleaseDelete;
