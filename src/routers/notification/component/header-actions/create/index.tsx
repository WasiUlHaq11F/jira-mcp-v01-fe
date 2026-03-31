import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNotification } from '../../../service';
import { NotificationCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import NOTIFICATION_CONSTANTS from '../../../constants';
import { notificationCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import NotificationForm from './create-form';
import defaultValues from '../../../data/notificationDefault'

const NotificationCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, NOTIFICATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<NotificationCreate>({
    resolver: zodResolver(notificationCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addNotificationMutation = useMutation({
    mutationFn: addNotification,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(NOTIFICATION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: NotificationCreate) => {
      try {
        await addNotificationMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [NOTIFICATION_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addNotificationMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addNotificationMutation.isSuccess || addNotificationMutation.isError) {
        addNotificationMutation.reset();
      }
    };
  }, [addNotificationMutation]);

  return (
    <ModalWrapper
      title={`Create ${NOTIFICATION_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Notifications'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addNotificationMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <NotificationForm />
      </FormProvider>
    </ModalWrapper>
  );
});


NotificationCreatePage.displayName = 'NotificationCreatePage';

export default NotificationCreatePage;
