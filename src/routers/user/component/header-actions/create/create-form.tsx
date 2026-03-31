import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/PasswordInput';
import { UserCreate } from '../../../interface';


const UserForm = memo(() => {
	const form = useFormContext<UserCreate>();





	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
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
		</Form>
	);
});
UserForm.displayName = 'UserForm';

export default UserForm;