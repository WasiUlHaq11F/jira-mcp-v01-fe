import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import NOTIFICATION_CONSTANTS from '../../../constants';
import { getNotificationDetails } from '../../../service';
import { NotificationViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const NotificationView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, NOTIFICATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: notificationResponse, isLoading } = useQuery({
    queryKey: [NOTIFICATION_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.notificationId],
    queryFn: () => getNotificationDetails(primaryKeys.notificationId),
    enabled: Boolean(showView && primaryKeys?.notificationId),
  });
  const data = notificationResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(NOTIFICATION_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${NOTIFICATION_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <NotificationViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

NotificationView.displayName = 'NotificationView';
export default NotificationView;
