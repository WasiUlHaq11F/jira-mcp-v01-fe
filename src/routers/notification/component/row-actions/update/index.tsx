import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getNotificationEditDetails, updateNotification } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { notificationUpdateSchema } from '../../../validation';
import { NotificationUpdate } from '../../../interface';
import NotificationUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import NOTIFICATION_CONSTANTS from '../../../constants';


const NotificationUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, NOTIFICATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(notificationUpdateSchema), []);

  const form = useForm<NotificationUpdate>({
  	resolver: zodResolver(notificationUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: notificationResponse, isLoading: isLoadingNotification } = useQuery({
    queryKey: [NOTIFICATION_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.notificationId],
    queryFn: () => getNotificationEditDetails(primaryKeys.notificationId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateNotificationMutation = useMutation({
    mutationFn: updateNotification,
  });

  const isLoading = isLoadingNotification;

  useEffect(() => {
    if (notificationResponse?.data) {
    form.reset(notificationResponse.data);
    }
  }, [notificationResponse, form]);

  const updateData = useCallback(
  async (data: NotificationUpdate) => {
    try {
      await updateNotificationMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [NOTIFICATION_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateNotificationMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(NOTIFICATION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${NOTIFICATION_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Notifications'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <NotificationUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

NotificationUpdateDrawer.displayName = 'NotificationUpdateDrawer';

export default NotificationUpdateDrawer;
