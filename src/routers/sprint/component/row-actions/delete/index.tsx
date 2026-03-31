import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteSprint } from '../../../service';
import SPRINT_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const SprintDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, SPRINT_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteSprint,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(SPRINT_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await deleteMutation.mutateAsync(primaryKeys);
            toast.success(`${SPRINT_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [SPRINT_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${SPRINT_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [deleteMutation, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={SPRINT_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={deleteMutation.isPending}
        />
    );
});

SprintDelete.displayName = 'SprintDelete';

export default SprintDelete;
