import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteRelease } from '../../../service';
import RELEASE_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const ReleaseDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, RELEASE_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteRelease,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(RELEASE_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await deleteMutation.mutateAsync(primaryKeys);
            toast.success(`${RELEASE_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [RELEASE_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${RELEASE_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [deleteMutation, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={RELEASE_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={deleteMutation.isPending}
        />
    );
});

ReleaseDelete.displayName = 'ReleaseDelete';

export default ReleaseDelete;
