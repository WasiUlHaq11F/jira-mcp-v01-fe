import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import SPRINT_CONSTANTS from '../../../constants';
import { getSprintDetails } from '../../../service';
import { SprintViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const SprintView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: sprintResponse, isLoading } = useQuery({
    queryKey: [SPRINT_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.sprintId],
    queryFn: () => getSprintDetails(primaryKeys.sprintId),
    enabled: Boolean(showView && primaryKeys?.sprintId),
  });
  const data = sprintResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(SPRINT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${SPRINT_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <SprintViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

SprintView.displayName = 'SprintView';
export default SprintView;
