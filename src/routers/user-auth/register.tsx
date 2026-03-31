import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Spinner } from '@/components/ui/spinner';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setSession } from '@/store/slice/sessionSlice';
import { CleanError } from '@/util/CleanError';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/PasswordInput';
import { z } from 'zod';
import { userRegister } from './service';
import { registerUserPayloadValidator } from './validation';
import { Form } from '@/components/ui/form';
import { Input, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Mail, User, Lock } from 'lucide-react';


type RegistrationFormData = z.infer<typeof registerUserPayloadValidator>;

const UserRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;


  const userRegisterMutation = useMutation({ mutationFn: userRegister });
  

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registerUserPayloadValidator),
    defaultValues: getDefaultFormValues(registerUserPayloadValidator),
  });


  const handleFinish = useCallback(
    async (values: RegistrationFormData) => {
      try {
        const response = await userRegisterMutation.mutateAsync(values);
        if (response) {
          const result = response.data;
          dispatch(
            setSession({
              ...session,
              token: result.token,
              user: result.user,
              isLoggedIn: true,
            }),
          );
          navigate(from, { replace: true });
        }
      } catch (error) {
        toast.error(CleanError(error));
        handleApiFormErrors(error, form);
      }
    },
    [userRegisterMutation, dispatch, session, navigate, from],
  );


  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);


  return (
    <div className="flex items-center justify-center py-12 px-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="">Join thousands of developers building amazing applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFinish)} className="flex flex-col gap-4">
			<Controller control={form.control}
			                    name="email"
			                    render={({ field, fieldState }) => (
			                        <Field data-invalid={fieldState.invalid}>
			                            <FieldLabel htmlFor={field.name}>Email <span className="text-destructive">*</span></FieldLabel>
			                                <Input
			                                    id={field.name}
			                                    type="email"
			                                    placeholder="Enter Email"
			                                    {...field}
			                                    value={field.value?.toString() || ''}
			                                />
                            
			                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
			                        </Field>
			                    )}
			                />
			<Controller control={form.control}
			                    name="username"
			                    render={({ field, fieldState }) => (
			                        <Field data-invalid={fieldState.invalid}>
			                            <FieldLabel htmlFor={field.name}>Username <span className="text-destructive">*</span></FieldLabel>
			                                <Input
			                                    id={field.name}
			                                    type="text"
			                                    placeholder="Enter Username"
			                                    {...field}
			                                    value={field.value?.toString() || ''}
			                                />
                            
			                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
			                        </Field>
			                    )}
			                />
			<Controller control={form.control}
			                    name="password"
			                    render={({ field, fieldState }) => (
			                        <Field data-invalid={fieldState.invalid}>
			                            <FieldLabel htmlFor={field.name}>Password <span className="text-destructive">*</span></FieldLabel>
			                                <PasswordInput placeholder="Enter Password" autoComplete="current-password" {...field} value={field.value?.toString() || ''} />
                            
			                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
			                        </Field>
			                    )}
			                />

              <Button type="submit" className="w-full" disabled={userRegisterMutation.isPending}>
                {userRegisterMutation.isPending && <Spinner />}
                Register
              </Button>

              
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/userLogin" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}; 
export default UserRegisterPage;