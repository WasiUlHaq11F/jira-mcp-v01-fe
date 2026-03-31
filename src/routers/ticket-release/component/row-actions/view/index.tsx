import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import TICKET_RELEASE_CONSTANTS from '../../../constants';
import { getTicketReleaseDetails } from '../../../service';
import { TicketReleaseViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const TicketReleaseView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: ticketReleaseResponse, isLoading } = useQuery({
    queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.ticketReleaseId],
    queryFn: () => getTicketReleaseDetails(primaryKeys.ticketReleaseId),
    enabled: Boolean(showView && primaryKeys?.ticketReleaseId),
  });
  const data = ticketReleaseResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${TICKET_RELEASE_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <TicketReleaseViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

TicketReleaseView.displayName = 'TicketReleaseView';
export default TicketReleaseView;
