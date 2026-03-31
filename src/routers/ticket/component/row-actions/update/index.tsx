import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTicketEditDetails, updateTicket } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ticketUpdateSchema } from '../../../validation';
import { TicketUpdate } from '../../../interface';
import TicketUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_CONSTANTS from '../../../constants';


const TicketUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(ticketUpdateSchema), []);

  const form = useForm<TicketUpdate>({
  	resolver: zodResolver(ticketUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: ticketResponse, isLoading: isLoadingTicket } = useQuery({
    queryKey: [TICKET_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.ticketId],
    queryFn: () => getTicketEditDetails(primaryKeys.ticketId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateTicketMutation = useMutation({
    mutationFn: updateTicket,
  });

  const isLoading = isLoadingTicket;

  useEffect(() => {
    if (ticketResponse?.data) {
    
      const formattedData = {
        ...ticketResponse.data,
			dueDate: ticketResponse.data.dueDate ? new Date(ticketResponse.data.dueDate) : null,

      };
      form.reset(formattedData);

    }
  }, [ticketResponse, form]);

  const updateData = useCallback(
  async (data: TicketUpdate) => {
    try {
      await updateTicketMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [TICKET_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateTicketMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(TICKET_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${TICKET_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Tickets'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <TicketUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

TicketUpdateDrawer.displayName = 'TicketUpdateDrawer';

export default TicketUpdateDrawer;
