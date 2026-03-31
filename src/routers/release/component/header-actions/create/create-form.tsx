import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import DatePicker from '@/components/DatePicker';
import { ReleaseCreate } from '../../../interface';


const ReleaseForm = memo(() => {
	const form = useFormContext<ReleaseCreate>();





	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<Controller control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name <span className="text-destructive">*</span></FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Name"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="versionNumber"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Version Number <span className="text-destructive">*</span></FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Version Number"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="releaseDate"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Release Date</FieldLabel>
                                <DatePicker value={field.value || undefined } onChange={field.onChange} placeholder="Select Release Date" />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="status"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Status <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`status-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Planned","label":"Planned"},{"value":"In Progress","label":"In Progress"},{"value":"Released","label":"Released"},{"value":"Archived","label":"Archived"}].map((option) => (
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
<Controller control={form.control}
                    name="jiraReleaseId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Jira Release Id</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Jira Release Id"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
			</div>
		</Form>
	);
});
ReleaseForm.displayName = 'ReleaseForm';

export default ReleaseForm;