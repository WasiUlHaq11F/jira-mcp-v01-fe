import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTicket } from '../../../service';
import { TicketCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_CONSTANTS from '../../../constants';
import { ticketCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import TicketForm from './create-form';
import defaultValues from '../../../data/ticketDefault'

const TicketCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<TicketCreate>({
    resolver: zodResolver(ticketCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addTicketMutation = useMutation({
    mutationFn: addTicket,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(TICKET_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: TicketCreate) => {
      try {
        await addTicketMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [TICKET_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addTicketMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addTicketMutation.isSuccess || addTicketMutation.isError) {
        addTicketMutation.reset();
      }
    };
  }, [addTicketMutation]);

  return (
    <ModalWrapper
      title={`Create ${TICKET_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Tickets'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addTicketMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <TicketForm />
      </FormProvider>
    </ModalWrapper>
  );
});


TicketCreatePage.displayName = 'TicketCreatePage';

export default TicketCreatePage;
