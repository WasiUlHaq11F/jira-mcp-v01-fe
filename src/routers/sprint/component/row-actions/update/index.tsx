import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSprintEditDetails, updateSprint } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { sprintUpdateSchema } from '../../../validation';
import { SprintUpdate } from '../../../interface';
import SprintUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import SPRINT_CONSTANTS from '../../../constants';


const SprintUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(sprintUpdateSchema), []);

  const form = useForm<SprintUpdate>({
  	resolver: zodResolver(sprintUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: sprintResponse, isLoading: isLoadingSprint } = useQuery({
    queryKey: [SPRINT_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.sprintId],
    queryFn: () => getSprintEditDetails(primaryKeys.sprintId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateSprintMutation = useMutation({
    mutationFn: updateSprint,
  });

  const isLoading = isLoadingSprint;

  useEffect(() => {
    if (sprintResponse?.data) {
    
      const formattedData = {
        ...sprintResponse.data,
			startDate: sprintResponse.data.startDate ? new Date(sprintResponse.data.startDate) : undefined,
			endDate: sprintResponse.data.endDate ? new Date(sprintResponse.data.endDate) : undefined,

      };
      form.reset(formattedData);

    }
  }, [sprintResponse, form]);

  const updateData = useCallback(
  async (data: SprintUpdate) => {
    try {
      await updateSprintMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [SPRINT_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateSprintMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(SPRINT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${SPRINT_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Sprints'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <SprintUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

SprintUpdateDrawer.displayName = 'SprintUpdateDrawer';

export default SprintUpdateDrawer;
