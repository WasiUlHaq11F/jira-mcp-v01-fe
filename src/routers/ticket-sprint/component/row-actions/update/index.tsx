import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTicketSprintEditDetails, updateTicketSprint } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ticketSprintUpdateSchema } from '../../../validation';
import { TicketSprintUpdate } from '../../../interface';
import TicketSprintUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_SPRINT_CONSTANTS from '../../../constants';


const TicketSprintUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(ticketSprintUpdateSchema), []);

  const form = useForm<TicketSprintUpdate>({
  	resolver: zodResolver(ticketSprintUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: ticketSprintResponse, isLoading: isLoadingTicketSprint } = useQuery({
    queryKey: [TICKET_SPRINT_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.ticketSprintId],
    queryFn: () => getTicketSprintEditDetails(primaryKeys.ticketSprintId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateTicketSprintMutation = useMutation({
    mutationFn: updateTicketSprint,
  });

  const isLoading = isLoadingTicketSprint;

  useEffect(() => {
    if (ticketSprintResponse?.data) {
    form.reset(ticketSprintResponse.data);
    }
  }, [ticketSprintResponse, form]);

  const updateData = useCallback(
  async (data: TicketSprintUpdate) => {
    try {
      await updateTicketSprintMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [TICKET_SPRINT_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateTicketSprintMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(TICKET_SPRINT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${TICKET_SPRINT_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Ticket Sprints'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <TicketSprintUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

TicketSprintUpdateDrawer.displayName = 'TicketSprintUpdateDrawer';

export default TicketSprintUpdateDrawer;
