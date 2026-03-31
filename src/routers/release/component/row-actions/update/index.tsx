import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getReleaseEditDetails, updateRelease } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { releaseUpdateSchema } from '../../../validation';
import { ReleaseUpdate } from '../../../interface';
import ReleaseUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import RELEASE_CONSTANTS from '../../../constants';


const ReleaseUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, RELEASE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(releaseUpdateSchema), []);

  const form = useForm<ReleaseUpdate>({
  	resolver: zodResolver(releaseUpdateSchema),
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: releaseResponse, isLoading: isLoadingRelease } = useQuery({
    queryKey: [RELEASE_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.releaseId],
    queryFn: () => getReleaseEditDetails(primaryKeys.releaseId),
    enabled: Boolean(showEdit && Object.keys(primaryKeys).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const updateReleaseMutation = useMutation({
    mutationFn: updateRelease,
  });

  const isLoading = isLoadingRelease;

  useEffect(() => {
    if (releaseResponse?.data) {
    
      const formattedData = {
        ...releaseResponse.data,
			releaseDate: releaseResponse.data.releaseDate ? new Date(releaseResponse.data.releaseDate) : null,

      };
      form.reset(formattedData);

    }
  }, [releaseResponse, form]);

  const updateData = useCallback(
  async (data: ReleaseUpdate) => {
    try {
      await updateReleaseMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [RELEASE_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateReleaseMutation, primaryKeys, queryClient, form],
);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(RELEASE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  return (
    <ModalWrapper
      title={`Edit ${RELEASE_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Releases'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ReleaseUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ReleaseUpdateDrawer.displayName = 'ReleaseUpdateDrawer';

export default ReleaseUpdateDrawer;
