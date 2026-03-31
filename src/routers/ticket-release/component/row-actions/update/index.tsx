import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTicketReleaseEditDetails, updateTicketRelease } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ticketReleaseUpdateSchema } from '../../../validation';
import { TicketReleaseUpdate } from '../../../interface';
import TicketReleaseUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TICKET_RELEASE_CONSTANTS from '../../../constants';


const TicketReleaseUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(ticketReleaseUpdateSchema), []);

  const form = useForm<TicketReleaseUpdate>({
  	resolver: zodResolver(ticketReleaseUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: ticketReleaseResponse, isLoading: isLoadingTicketRelease } = useQuery({
    queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.ticketReleaseId],
    queryFn: () => getTicketReleaseEditDetails(primaryKeys.ticketReleaseId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateTicketReleaseMutation = useMutation({
    mutationFn: updateTicketRelease,
  });

  const isLoading = isLoadingTicketRelease;

  useEffect(() => {
    if (ticketReleaseResponse?.data) {
    form.reset(ticketReleaseResponse.data);
    }
  }, [ticketReleaseResponse, form]);

  const updateData = useCallback(
  async (data: TicketReleaseUpdate) => {
    try {
      await updateTicketReleaseMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [TICKET_RELEASE_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateTicketReleaseMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(TICKET_RELEASE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${TICKET_RELEASE_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Ticket Releases'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <TicketReleaseUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

TicketReleaseUpdateDrawer.displayName = 'TicketReleaseUpdateDrawer';

export default TicketReleaseUpdateDrawer;
