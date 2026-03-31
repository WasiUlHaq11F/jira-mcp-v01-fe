import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTicketSprint } from '../../../service';
import { TicketSprintCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_SPRINT_CONSTANTS from '../../../constants';
import { ticketSprintCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import TicketSprintForm from './create-form';
import defaultValues from '../../../data/ticketSprintDefault'

const TicketSprintCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<TicketSprintCreate>({
    resolver: zodResolver(ticketSprintCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addTicketSprintMutation = useMutation({
    mutationFn: addTicketSprint,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: TicketSprintCreate) => {
      try {
        await addTicketSprintMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [TICKET_SPRINT_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addTicketSprintMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addTicketSprintMutation.isSuccess || addTicketSprintMutation.isError) {
        addTicketSprintMutation.reset();
      }
    };
  }, [addTicketSprintMutation]);

  return (
    <ModalWrapper
      title={`Create ${TICKET_SPRINT_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Ticket Sprints'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addTicketSprintMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <TicketSprintForm />
      </FormProvider>
    </ModalWrapper>
  );
});


TicketSprintCreatePage.displayName = 'TicketSprintCreatePage';

export default TicketSprintCreatePage;
