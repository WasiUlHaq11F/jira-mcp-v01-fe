import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import RELEASE_CONSTANTS from '../../../constants';
import { getReleaseDetails } from '../../../service';
import { ReleaseViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ReleaseView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: releaseResponse, isLoading } = useQuery({
    queryKey: [RELEASE_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.releaseId],
    queryFn: () => getReleaseDetails(primaryKeys.releaseId),
    enabled: Boolean(showView && primaryKeys?.releaseId),
  });
  const data = releaseResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(RELEASE_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${RELEASE_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ReleaseViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ReleaseView.displayName = 'ReleaseView';
export default ReleaseView;
