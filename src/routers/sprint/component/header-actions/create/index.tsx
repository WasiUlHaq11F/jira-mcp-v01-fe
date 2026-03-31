import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSprint } from '../../../service';
import { SprintCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import SPRINT_CONSTANTS from '../../../constants';
import { sprintCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import SprintForm from './create-form';
import defaultValues from '../../../data/sprintDefault'

const SprintCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, SPRINT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<SprintCreate>({
    resolver: zodResolver(sprintCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addSprintMutation = useMutation({
    mutationFn: addSprint,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(SPRINT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: SprintCreate) => {
      try {
        await addSprintMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [SPRINT_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addSprintMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addSprintMutation.isSuccess || addSprintMutation.isError) {
        addSprintMutation.reset();
      }
    };
  }, [addSprintMutation]);

  return (
    <ModalWrapper
      title={`Create ${SPRINT_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Sprints'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addSprintMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <SprintForm />
      </FormProvider>
    </ModalWrapper>
  );
});


SprintCreatePage.displayName = 'SprintCreatePage';

export default SprintCreatePage;
