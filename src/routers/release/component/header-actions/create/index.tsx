import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRelease } from '../../../service';
import { ReleaseCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import RELEASE_CONSTANTS from '../../../constants';
import { releaseCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ReleaseForm from './create-form';
import defaultValues from '../../../data/releaseDefault'

const ReleaseCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ReleaseCreate>({
    resolver: zodResolver(releaseCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addReleaseMutation = useMutation({
    mutationFn: addRelease,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(RELEASE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: ReleaseCreate) => {
      try {
        await addReleaseMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [RELEASE_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addReleaseMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addReleaseMutation.isSuccess || addReleaseMutation.isError) {
        addReleaseMutation.reset();
      }
    };
  }, [addReleaseMutation]);

  return (
    <ModalWrapper
      title={`Create ${RELEASE_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Releases'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addReleaseMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ReleaseForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ReleaseCreatePage.displayName = 'ReleaseCreatePage';

export default ReleaseCreatePage;
