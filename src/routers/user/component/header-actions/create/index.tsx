import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../../../service';
import { UserCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import USER_CONSTANTS from '../../../constants';
import { userCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import UserForm from './create-form';
import defaultValues from '../../../data/userDefault'

const UserCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, USER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<UserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(USER_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const handleSubmit = useCallback(
    async (data: UserCreate) => {
      try {
        await addUserMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: [USER_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addUserMutation, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (addUserMutation.isSuccess || addUserMutation.isError) {
        addUserMutation.reset();
      }
    };
  }, [addUserMutation]);

  return (
    <ModalWrapper
      title={`Create ${USER_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Users'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={addUserMutation.isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <UserForm />
      </FormProvider>
    </ModalWrapper>
  );
});


UserCreatePage.displayName = 'UserCreatePage';

export default UserCreatePage;
