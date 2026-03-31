import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import TICKET_CONSTANTS from '../../../constants';
import { getTicketDetails } from '../../../service';
import { TicketViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const TicketView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: ticketResponse, isLoading } = useQuery({
    queryKey: [TICKET_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.ticketId],
    queryFn: () => getTicketDetails(primaryKeys.ticketId),
    enabled: Boolean(showView && primaryKeys?.ticketId),
  });
  const data = ticketResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(TICKET_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${TICKET_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <TicketViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

TicketView.displayName = 'TicketView';
export default TicketView;
