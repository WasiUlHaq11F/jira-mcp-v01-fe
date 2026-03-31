import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import TICKET_SPRINT_CONSTANTS from '../../../constants';
import { getTicketSprintDetails } from '../../../service';
import { TicketSprintViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const TicketSprintView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: ticketSprintResponse, isLoading } = useQuery({
    queryKey: [TICKET_SPRINT_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.ticketSprintId],
    queryFn: () => getTicketSprintDetails(primaryKeys.ticketSprintId),
    enabled: Boolean(showView && primaryKeys?.ticketSprintId),
  });
  const data = ticketSprintResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${TICKET_SPRINT_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <TicketSprintViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

TicketSprintView.displayName = 'TicketSprintView';
export default TicketSprintView;
