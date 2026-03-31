import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RootState, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { CleanError } from '@/util/CleanError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { getUserProfile, updateUserProfile } from '../service';
import { profileUserPayloadValidator } from '../validation';
import { Form } from '@/components/ui/form';
import { Input, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Mail, User } from 'lucide-react';



type ProfileFormData = z.infer<typeof profileUserPayloadValidator>;

const UserProfileEditPage: React.FC = () => {
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

    

  const { data: profileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(session.token),
    enabled: isLoggedIn,
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ profileData }: { profileData: ProfileFormData }) => updateUserProfile(profileData),
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileUserPayloadValidator),
    defaultValues: profileData?.data || {},
  });





  useEffect(() => {
    if (profileData) {form.reset(profileData?.data);
    }
  }, [profileData, form]);

  const handleFormSubmit = async (values: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({ profileData: values });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully');
      navigate('/userProfile');
    } catch (error) {
      toast.error(CleanError(error));
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-xl">Profile</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2"></div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-5 items-start">
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
			                    name="role"
			                    render={({ field, fieldState }) => (
			                        <Field data-invalid={fieldState.invalid}>
			                            <FieldLabel htmlFor={field.name}>Role <span className="text-destructive">*</span></FieldLabel>
			                                <Select  key={`role-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
			                                <SelectTrigger id={field.name} className="w-full">
			                                    <SelectValue placeholder="Select Role" />
			                                </SelectTrigger>
			                                <SelectContent>
			                                    {[{"value":"admin","label":"admin"},{"value":"projectManager","label":"projectManager"},{"value":"developer","label":"developer"},{"value":"qaTeam","label":"qaTeam"},{"value":"leadership","label":"leadership"}].map((option) => (
			                                            <SelectItem key={option.value} value={option.value.toString()}>
			                                                {option.label}
			                                            </SelectItem>
			                                        ))}
			                                </SelectContent>
			                            </Select>
                            
			                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
			                        </Field>
			                    )}
			                />

              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={(e) => { e.preventDefault(); navigate('/userProfile'); }}>
                  Cancel
                </Button>
                <Button className="flex items-center gap-2" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending && <Spinner />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileEditPage;
