import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTicketRelease } from '../../../service';
import { TicketReleaseCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_RELEASE_CONSTANTS from '../../../constants';
import { ticketReleaseCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import TicketReleaseForm from './create-form';
import defaultValues from '../../../data/ticketReleaseDefault'

const TicketReleaseCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<TicketReleaseCreate>({
    resolver: zodResolver(ticketReleaseCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addTicketReleaseMutation = useMutation({
    mutationFn: addTicketRelease,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: TicketReleaseCreate) => {
      try {
        await addTicketReleaseMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addTicketReleaseMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addTicketReleaseMutation.isSuccess || addTicketReleaseMutation.isError) {
        addTicketReleaseMutation.reset();
      }
    };
  }, [addTicketReleaseMutation]);

  return (
    <ModalWrapper
      title={`Create ${TICKET_RELEASE_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Ticket Releases'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addTicketReleaseMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <TicketReleaseForm />
      </FormProvider>
    </ModalWrapper>
  );
});


TicketReleaseCreatePage.displayName = 'TicketReleaseCreatePage';

export default TicketReleaseCreatePage;
